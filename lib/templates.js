{
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "hours",
              "hoursInterval": 24
            }
          ]
        }
      },
      "id": "22342ff2-b240-4ce2-a1f3-d7e8f1d0fdd7",
      "name": "Every 24h",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.3,
      "position": [
        112,
        304
      ]
    },
    {
      "parameters": {
        "jsCode": "const urls = [\n  \"https://www.maxicoffee.com/machine-expresso-semi-professionnelle-c-4_87.html\",\n  \"https://www.maxicoffee.com/machine-expresso-levier-c-4_88.html\",\n  \"https://www.maxicoffee.com/moulin-cafe-professionnel-c-5_89.html\"\n];\nreturn urls.map(url => ({ json: { url } }));"
      },
      "id": "62811010-e386-41e8-92e2-ffe735c048fc",
      "name": "Liste URLs MaxiCoffee",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        304,
        304
      ]
    },
    {
      "parameters": {
        "url": "={{ \"https://s.jina.ai/\" + $json.url }}",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "jinaAiApi",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Accept",
              "value": "text/plain"
            },
            {
              "name": "X-With-Generated-Alt",
              "value": "true"
            }
          ]
        },
        "options": {}
      },
      "id": "f1542b45-a253-4ec3-a856-3621d0b3faf6",
      "name": "Jina Scrape MaxiCoffee",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.4,
      "position": [
        512,
        304
      ],
      "credentials": {
        "jinaAiApi": {
          "id": "fslAmt7XOUTDKnlo",
          "name": "Jina AI account"
        }
      }
    },
    {
      "parameters": {
        "mode": "runOnceForEachItem",
        "jsCode": "const rawHtml = $input.item.json.data || \"\";\nreturn {\n  cleanText: rawHtml.replace(/[\\n\\r\\t]+/g, \" \").substring(0, 12000),\n  sourceCategory: $(\"Liste URLs MaxiCoffee\").item.json.url\n};"
      },
      "id": "3e37f4b8-fbd8-4844-a0ed-c1b430f51595",
      "name": "Nettoyeur HTML",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        704,
        304
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.groq.com/openai/v1/chat/completions",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "groqApi",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ {\"model\": \"llama-3.3-70b-versatile\", \"messages\": [{\"role\": \"system\", \"content\": \"Tu es un expert extraction de données e-commerce. Tu identifies les produits espresso premium dans du HTML brut MaxiCoffee.\"}, {\"role\": \"user\", \"content\": \"HTML BRUT :\\n\" + $json.cleanText + \"\\n\\nEXTRAIS TOUS LES PRODUITS (max 10) avec :\\n- brand (marque exacte)\\n- model (modèle précis)\\n- price (prix en EUR, chiffres uniquement)\\n- image_url (URL image produit si trouvée)\\n- product_url (lien vers fiche produit)\\n\\nRÉPONDS EN JSON ARRAY STRICT :\\n[{\\\"brand\\\": \\\"La Marzocco\\\", \\\"model\\\": \\\"Linea Mini\\\", \\\"price\\\": 4990, \\\"image_url\\\": \\\"https://..\\\", \\\"product_url\\\": \\\"https://..\\\"}]\"}], \"temperature\": 0.1} }}",
        "options": {}
      },
      "id": "c35d2a58-5d75-45cb-82e0-a502e8118040",
      "name": "Groq - Extraction Produits",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.4,
      "position": [
        912,
        304
      ],
      "credentials": {
        "groqApi": {
          "id": "ic9YqHvZxaq8ViSg",
          "name": "Groq account"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "const results = [];\nfor (const item of $input.all()) {\n  let aiRaw = item.json.choices[0].message.content;\n  let products = [];\n  try {\n    const jsonMatch = aiRaw.match(/\\[.*\\]/s);\n    if (jsonMatch) {\n      products = JSON.parse(jsonMatch[0]);\n    }\n  } catch (e) {\n    console.log(\"Erreur parsing:\", e);\n  }\n  for (const p of products) {\n    results.push({\n      brand: p.brand || \"Unknown\",\n      model: p.model || \"Unknown\",\n      price: parseFloat(p.price) || 0,\n      description: `${p.brand} ${p.model} - Machine espresso d'exception disponible sur MaxiCoffee`,\n      image_url: p.image_url || \"\",\n      source_url: p.product_url || \"https://www.maxicoffee.com\",\n      category: \"espresso-premium\"\n    });\n  }\n}\nreturn results.map(r => ({ json: r }));"
      },
      "id": "ebc973ce-f975-42f2-80c9-11bd5a2fa31d",
      "name": "Parser JSON Products",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        1104,
        304
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://yzpwapteyflnreryemty.supabase.co/rest/v1/products",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "supabaseApi",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Prefer",
              "value": "resolution=merge-duplicates"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ {\"brand\": $json.brand, \"model\": $json.model, \"price_current\": $json.price, \"description\": $json.description, \"image_url\": $json.image_url, \"source_url\": $json.source_url, \"category\": $json.category, \"last_hunt_at\": \"now()\"} }}",
        "options": {}
      },
      "id": "61d5a038-c4db-40c5-82f0-824bdcde2e97",
      "name": "Supabase - Insert Product",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.4,
      "position": [
        1312,
        304
      ],
      "credentials": {
        "supabaseApi": {
          "id": "j2xRNeaVfpZv8Ivf",
          "name": "Supabase account"
        }
      }
    }
  ],
  "connections": {
    "Every 24h": {
      "main": [
        [
          {
            "node": "Liste URLs MaxiCoffee",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Liste URLs MaxiCoffee": {
      "main": [
        [
          {
            "node": "Jina Scrape MaxiCoffee",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Jina Scrape MaxiCoffee": {
      "main": [
        [
          {
            "node": "Nettoyeur HTML",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Nettoyeur HTML": {
      "main": [
        [
          {
            "node": "Groq - Extraction Produits",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Groq - Extraction Produits": {
      "main": [
        [
          {
            "node": "Parser JSON Products",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Parser JSON Products": {
      "main": [
        [
          {
            "node": "Supabase - Insert Product",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "aiBuilderAssisted": true,
    "instanceId": "435a4f38a1f4d33ad924e55fed75aa7a44d6675d75490ed4b419edef9968384d"
  }
}
