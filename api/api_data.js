define({ "api": [
  {
    "type": "post",
    "url": "/auth",
    "title": "Request Auth Token",
    "name": "Authentication",
    "group": "Authentication",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password.</p>"
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
            "field": "token",
            "description": "<p>JWT token.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User Object.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\t\"token\" : \"JWT-TOKEN-STRING\"\n\t\"user\" : {\n\t\t\"id\" : 1\n\t\t\"name\" : \"joe\"\n\t\t\"username\" : \"joe234\",\n\t\t\"password\" : NULL,\n\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error 404",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "filename": "routes/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/auth/check",
    "title": "Check Auth Token",
    "name": "CheckAuthenticationToken",
    "group": "Authentication",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Did Token Pass.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Token Passed",
          "content": "HTTP/1.1 200 OK\n{\n\t\"result\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Token Failed",
          "content": "HTTP/1.1 200 OK\n{\n\t\"result\" : false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/users/register",
    "title": "Register",
    "name": "Register",
    "group": "Authentication",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's UserName</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's Password</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "MissingData",
            "description": "<p>Required Data Missing</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\" : \"Name Required\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>New User ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\t\"id\": 2\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/contact/send",
    "title": "Send Contact Email",
    "name": "ContactSend",
    "group": "Contact",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email Address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Content.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Did Token Pass?</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Token Passed",
          "content": "HTTP/1.1 200 OK\n{\n\t\"result\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Input",
          "content": "HTTP/1.1 400\n{\n\t\"error\" : \"Error Text\",\n    \"result\": \"false\"\n}",
          "type": "json"
        },
        {
          "title": "System Error",
          "content": "\tHTTP/1.1 500\n\t{\n\t\t\"error\" : \"Error Sending Mail\",\n\t    \"err\"   : \"Specific Error\",\n     \"stack\" : \"Stack trace of Specific Error\",\n\t    \"result\": \"false\"\n\t}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/contact.js",
    "groupTitle": "Contact"
  },
  {
    "type": "get",
    "url": "/projects/:id",
    "title": "Get Project",
    "name": "GetProject",
    "group": "Project",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>Project Object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "{\n\t\"id\" \t\t: 1,\n\t\"name\" \t\t: \"John Doe\",\n\t...\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/projects.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/projects/:id/gallery/:i",
    "title": "Get Project Gallery Image",
    "name": "GetProjectGalleryImage",
    "group": "Project",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "File",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/projects.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/projects/:id/gallery/:i/:size",
    "title": "Get Project Gallery Image Resized",
    "name": "GetProjectGalleryImage",
    "group": "Project",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "File",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/projects.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/projects/:id/thumb",
    "title": "Get Project Thumbnail",
    "name": "GetProjectThumbnail",
    "group": "Project",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "File",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/projects.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/projects/:id/thumb/:size",
    "title": "Get Project Thumbnail Resized",
    "name": "GetProjectThumbnailResized",
    "group": "Project",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "File",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/projects.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/projects",
    "title": "Get All Projects",
    "name": "GetProjects",
    "group": "Project",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "projects",
            "description": "<p>Array of Projects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "[\n\t{\n\t\t\"id\" \t\t: 1,\n\t\t\"name\" \t\t: \"John Doe\",\n\t\t...\n\t},\n\t...\n]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/projects.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/projects/all",
    "title": "Get All Projects (Full)",
    "name": "GetProjectsFull",
    "group": "Project",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "projects",
            "description": "<p>Array of Projects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "[\n\t{\n\t\t\"id\" \t\t: 1,\n\t\t\"name\" \t\t: \"John Doe\",\n\t\t...\n\t},\n\t...\n]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/projects.js",
    "groupTitle": "Project"
  },
  {
    "type": "post",
    "url": "/skills",
    "title": "Add Skill",
    "name": "AddExperience",
    "group": "Skill",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin",
        "title": "Admin Access Only",
        "description": "<p>Only users whose token includes administrator access have access to this</p>"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Skill Name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>Skill Year</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Auth Token - Can be post, get, or header x-access-token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "MissingData",
            "description": "<p>Required Data Missing</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\" : \"Name Required\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>New User ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\t\"id\": 2\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/skills.js",
    "groupTitle": "Skill"
  },
  {
    "type": "delete",
    "url": "/skills/:id",
    "title": "Delete Skill",
    "name": "DeleteExperience",
    "group": "Skill",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin",
        "title": "Admin Access Only",
        "description": "<p>Only users whose token includes administrator access have access to this</p>"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Skill Unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Auth Token - Can be post, get, or header x-access-token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "ExperienceNotFound",
            "description": "<p>Skill was not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "routes/skills.js",
    "groupTitle": "Skill"
  },
  {
    "type": "get",
    "url": "/skills/:id",
    "title": "Get Skill",
    "name": "GetExperience",
    "group": "Skill",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "skill",
            "description": "<p>Skill Object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "{\n\t\"id\" \t\t: 1,\n\t\"name\" \t\t: \"John Doe\",\n\t\"year\"\t\t: \"1932\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/skills.js",
    "groupTitle": "Skill"
  },
  {
    "type": "get",
    "url": "/skills",
    "title": "Get All Skills",
    "name": "GetExperiences",
    "group": "Skill",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "skills",
            "description": "<p>Array of Skills</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "[\n\t{\n\t\t\"id\" \t\t: 1,\n\t\t\"name\" \t\t: \"John Doe\",\n\t\t\"year\"\t\t: 1992\n\t},\n\t...\n]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/skills.js",
    "groupTitle": "Skill"
  },
  {
    "type": "put",
    "url": "/skills",
    "title": "Update Skill",
    "name": "UpdateExperience",
    "group": "Skill",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin",
        "title": "Admin Access Only",
        "description": "<p>Only users whose token includes administrator access have access to this</p>"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "skill",
            "description": "<p>Skill object { id, name, year }</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Auth Token - Can be post, get, or header x-access-token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "MissingData",
            "description": "<p>Required Data Missing</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "ExperienceNotFound",
            "description": "<p>Skill was not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\" : \"Name Required\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "routes/skills.js",
    "groupTitle": "Skill"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Add User",
    "name": "AddUser",
    "group": "User",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin",
        "title": "Admin Access Only",
        "description": "<p>Only users whose token includes administrator access have access to this</p>"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's UserName</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's Password</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "admin",
            "description": "<p>Is User Admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Auth Token - Can be post, get, or header x-access-token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "MissingData",
            "description": "<p>Required Data Missing</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\" : \"Name Required\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>New User ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\t\"id\": 2\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete User",
    "name": "DeleteUser",
    "group": "User",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin",
        "title": "Admin Access Only",
        "description": "<p>Only users whose token includes administrator access have access to this</p>"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User's Unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Auth Token - Can be post, get, or header x-access-token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User was not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get User",
    "name": "GetUser",
    "group": "User",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User Object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "{\n\t\"id\" \t\t: 1,\n\t\"name\" \t\t: \"John Doe\",\n\t\"username\"\t: \"johndoe132\",\n\t\"password\"\t: NULL\n\t\"admin\"\t\t: 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get All Users",
    "name": "GetUsers",
    "group": "User",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>Array of Users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "[\n\t{\n\t\t\"id\" \t\t: 1,\n\t\t\"name\" \t\t: \"John Doe\",\n\t\t\"username\"\t: \"johndoe132\",\n\t\t\"password\"\t: NULL\n\t\t\"admin\"\t\t: 0\n\t},\n\t...\n]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/promote/:id",
    "title": "Promote User",
    "name": "PromoteUser",
    "group": "User",
    "version": "1.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/demote/:id",
    "title": "Demote User",
    "name": "PromoteUser",
    "group": "User",
    "version": "1.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users",
    "title": "Update User",
    "name": "UpdateUser",
    "group": "User",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin",
        "title": "Admin Access Only",
        "description": "<p>Only users whose token includes administrator access have access to this</p>"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User's Unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's UserName</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's Password</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "admin",
            "description": "<p>Is User Admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Auth Token - Can be post, get, or header x-access-token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "MissingData",
            "description": "<p>Required Data Missing</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "\t\tHTTP/1.1 400 Bad Request\n\t\t{\n   \t\t\"error\" : \"Name Required\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  }
] });
