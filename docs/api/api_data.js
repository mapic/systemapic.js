define({ "api": [
  {
    "type": "get",
    "url": "/api/status",
    "title": "Get portal status",
    "name": "status",
    "group": "Admin",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "status",
            "description": "<p>Status of portal, versions etc.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": {\n    \"versions\": {\n      \"systemapic_api\": \"1.3.5\",\n      \"postgis\": \"POSTGIS=2.1.7 r13414 GEOS=3.4.2-CAPI-1.8.2 r3921 PROJ=Rel. 4.8.0, 6 March 2012 GDAL=GDAL 1.10.1, released 2013/08/26 LIBXML=2.9.1 LIBJSON=UNKNOWN TOPOLOGY RASTER\",\n      \"postgres\": \"PostgreSQL 9.3.9 on x86_64-unknown-linux-gnu, compiled by gcc (Ubuntu 4.8.2-19ubuntu1) 4.8.2, 64-bit\",\n      \"mongodb\": \"3.2.1\",\n      \"redis\": \"3.0.6\"\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "https://dev.systemapic.com/api/status"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>A valid access token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The <code>access_token</code> is invalid. (403)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/import",
    "title": "Import data",
    "name": "import",
    "group": "Data",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Buffer",
            "optional": false,
            "field": "data",
            "description": "<p>File buffer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>A valid access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "status",
            "description": "<p>Upload Status JSON</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t\"file_id\":\"file_fxqzngykgzjxtsunulti\",\n\t\"user_id\":\"test-user-uuid\",\n\t\"filename\":\"shapefile.zip\",\n\t\"timestamp\":1453063189097,\n\t\"status\":\"Processing\",\n\t\"size\":109770,\n\t\"upload_success\":true,\n\t\"error_code\":null,\n\t\"error_text\":null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Data",
    "sampleRequest": [
      {
        "url": "https://dev.systemapic.com/api/import"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The <code>access_token</code> is invalid. (403)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/file/delete",
    "title": "Delete data",
    "name": "delete",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "file_id",
            "description": "<p>File id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>A valid access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "status",
            "description": "<p>Upload Status JSON</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"success\": true,\n  \"err\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The <code>access_token</code> is invalid. (401)</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad_request",
            "description": "<p>file_id does not exist in request body (400)</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_found",
            "description": "<p>database_name or table_name does not exist in file.data.postgis or file_id doesn't exist in file.data.raster (404)</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Internal_server_error",
            "description": "<p>Problems with drop table (500)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Error 400: Bad request\n{\n   \"error\": {\n\t\t\"message\": \"Missing information. Check out https://docs.systemapic.com/ for details on the API.\",\n\t\t\"code\": \"400\",\n\t\t\"errors\": {\n\t\t\t\"missingRequiredFields\": ['file_id']\n\t\t}\n\t}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Error 404: Not found\n{\n   \"error\": {\n\t\t\"message\": \"Missing information. Check out https://docs.systemapic.com/ for details on the API.\",\n\t\t\"code\": \"404\"\n\t}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Error 500: Internal server error\n{\n   \"error\": {\n\t\t\"message\": \"Can't drop table tableName\",\n\t\t\"code\": \"500\"\n\t}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Error 404: Not found\n{\n   \"error\": {\n\t\t\"message\": \"No such file.\",\n\t\t\"code\": \"404\"\n\t}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "File",
    "sampleRequest": [
      {
        "url": "https://dev.systemapic.com/api/file/delete"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/file/getLayers",
    "title": "Get layers",
    "name": "getLayers",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of file(raster or postgis)</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Object with file_id field for raster files or database_name and table_name for postgis files</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>A valid access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "array",
            "description": "<p>of layers</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n  {\n\t  uuid: 'layer uuid',\n\t  title: 'layer title',\n\t  description: 'layer description',\n\t  ... etc\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The <code>access_token</code> is invalid. (401)</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Missing",
            "description": "<p>required fields. (400)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Error 400: Missing type parameter or database_name and table_name for postgis type\n{\n   \"error\": \"Missing information. Check out https://docs.systemapic.com/ for details on the API.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Error 400: Missing file_id for rater type\n{\n   \"error\": \"request body should contains data.file_id\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "File",
    "sampleRequest": [
      {
        "url": "https://dev.systemapic.com/api/file/getLayers"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/file/update",
    "title": "Update a file",
    "name": "update",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>Uuid of file</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>A valid access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "updated",
            "description": "<p>Array of updated fields</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "file",
            "description": "<p>Updated file</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"updated\": ['name', 'description'],\n  \"file\": {\n      lastUpdated: '2016-01-19T12:49:49.076Z',\n      created: '2016-01-19T12:49:48.943Z',\n      ... etc\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The <code>access_token</code> is invalid. (401)</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "File",
            "description": "<p>with uuid <code>uuid</code> doesn't exist. (400)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Error 400: File doesn't exist\n{\n   \"error\": \"bad file uuid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "File",
    "sampleRequest": [
      {
        "url": "https://dev.systemapic.com/api/file/update"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/layers/new",
    "title": "Create layer",
    "name": "create",
    "group": "Layer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of new layer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of new layer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legend",
            "description": "<p>Legend of new legend</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>File of new layer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "metadata",
            "description": "<p>Metadata of new layer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Data of new layer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "style",
            "description": "<p>Style of new layer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>A valid access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "Layer",
            "description": "<p>New Layer object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   __v: 0,\n   lastUpdated: '2016-01-20T10:55:30.983Z',\n   created: '2016-01-20T10:55:30.983Z',\n   legend: '',\n   description: 'new layer description',\n   title: 'new layer title',\n   uuid: 'layer-ae4fc38c-58f0-4468-81e7-7330d226dc24',\n   _id: '569f67a2ebb7233b667d8a02'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The <code>access_token</code> is invalid. (401)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Layer",
    "sampleRequest": [
      {
        "url": "https://dev.systemapic.com/api/layers/new"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/layer/update",
    "title": "Update layer",
    "name": "update",
    "group": "Layer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "layer",
            "description": "<p>uuid of updated layer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>New title of updated layer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>New description of updated layer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "satellite_position",
            "description": "<p>New satellite_position of updated layer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "copyright",
            "description": "<p>New copyright of updated layer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tooltip",
            "description": "<p>New tooltip of updated layer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "style",
            "description": "<p>New style of updated layer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filter",
            "description": "<p>New filter of updated layer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legends",
            "description": "<p>New legends of updated layer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "opacity",
            "description": "<p>New opacity of updated layer</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zIndex",
            "description": "<p>New zIndex of updated layer</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>New data of updated layer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>A valid access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>Update info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "'save done'",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The <code>access_token</code> is invalid. (401)</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Missing",
            "description": "<p>required fields. (400)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Error 400: Missing layer parameter or layer with such id doesn't exist\n{\n   \"error\": \"Missing information. Check out https://docs.systemapic.com/ for details on the API.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Layer",
    "sampleRequest": [
      {
        "url": "https://dev.systemapic.com/api/layer/update"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/project/create",
    "title": "Create a project",
    "name": "create",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>A valid access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "Project",
            "description": "<p>JSON object of the newly created project</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Project",
    "sampleRequest": [
      {
        "url": "https://dev.systemapic.com/api/project/create"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The <code>access_token</code> is invalid. (403)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/project/get",
    "title": "Get a project",
    "name": "create",
    "group": "Project",
    "description": "<p>Can get project <em>either</em> by <code>project_id</code> OR <code>username, project_slug</code></p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "project_id",
            "description": "<p>Id project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "project_slug",
            "description": "<p>Project slug (shortname in url)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>A valid access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "Project",
            "description": "<p>JSON object of the newly created project</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Project",
    "sampleRequest": [
      {
        "url": "https://dev.systemapic.com/api/project/get"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The <code>access_token</code> is invalid. (403)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/project/delete",
    "title": "Delete a project",
    "name": "delete",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectUuid",
            "description": "<p>Uuid of project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>A valid access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project",
            "description": "<p>ID of deleted project</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "deleted",
            "description": "<p>True if successful</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"project\": \"project-o121l2m-12d12dlk-addasml\",\n  \"deleted\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "Project",
    "sampleRequest": [
      {
        "url": "https://dev.systemapic.com/api/project/delete"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The <code>access_token</code> is invalid. (403)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/token",
    "title": "Get access token",
    "name": "access_token",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Email or username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "refresh",
            "defaultValue": "false",
            "description": "<p>Refresh access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "status",
            "description": "<p>Access token JSON</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t\"access_token\":\"AMduTdFBlXcBc1PKS5Ot4MZzwGjPhKw3y2LzJwJ0CGz0lpRGhK5xHGMcGLqvrOfY1aBR4M9Y4O126WRr5YSQGNZoLPbN0EXMwlRD0ajCqsd4MRr55UpfVYAfrLRL9i0tuglrtGYVs2iT8bl75ZVfYnbDl4Vjp4ElQoWqf6XdqMsIr25XxO5cZB9NRRl3mxA8gWRzCd5bvgZFZTWa6Htx5ugRqwWiudc8lbWNDCx85ms1up94HLKrQXoGMC8FVgf4\",\n\t\"expires_in\":\"36000\",\n\t\"token_type\":\"Bearer\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "json",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Missing or invalid information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n    \"error\": \"Please provide username/email and password.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://dev.systemapic.com/api/token"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/token/check",
    "title": "Check access token",
    "name": "check_access_token",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "status",
            "description": "<p>Access token JSON</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://dev.systemapic.com/api/token/check"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>A valid access token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The <code>access_token</code> is invalid. (403)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/token/check",
    "title": "Check access token",
    "name": "check_access_token",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "status",
            "description": "<p>Valid status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t\"valid\" : true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://dev.systemapic.com/api/token/check"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>A valid access token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The <code>access_token</code> is invalid. (403)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/portal",
    "title": "Get portal store",
    "name": "getPortal",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "Projects",
            "description": "<p>Projects that user have access to</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "Datasets",
            "description": "<p>Datasets that user owns or have access to</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "Contacts",
            "description": "<p>Contacts that user has in contact list</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://dev.systemapic.com/api/portal"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>A valid access token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The <code>access_token</code> is invalid. (403)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/token/refresh",
    "title": "Refresh access token",
    "name": "refresh_access_token",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "status",
            "description": "<p>Access token JSON</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t\"access_token\":\"AMduTdFBlXcBc1PKS5Ot4MZzwGjPhKw3y2LzJwJ0CGz0lpRGhK5xHGMcGLqvrOfY1aBR4M9Y4O126WRr5YSQGNZoLPbN0EXMwlRD0ajCqsd4MRr55UpfVYAfrLRL9i0tuglrtGYVs2iT8bl75ZVfYnbDl4Vjp4ElQoWqf6XdqMsIr25XxO5cZB9NRRl3mxA8gWRzCd5bvgZFZTWa6Htx5ugRqwWiudc8lbWNDCx85ms1up94HLKrQXoGMC8FVgf4\",\n\t\"expires_in\":\"36000\",\n\t\"token_type\":\"Bearer\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://dev.systemapic.com/api/token/refresh"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>A valid access token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The <code>access_token</code> is invalid. (403)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error 401: Unauthorized\n{\n   \"error\": \"Invalid access token.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/user/session",
    "title": "Check if already logged in (browser-only)",
    "name": "user_session",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "access_token",
            "description": "<p>Valid access token (either user or public)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/routes.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://dev.systemapic.com/api/user/session"
      }
    ]
  }
] });
