/project-root
├── docker-compose.yml        # Docker Compose file for containerized setup
├── Dockerfile                # Dockerfile for the Node.js app
├── .dockerignore             # Ignore unnecessary files for Docker build
├── .env                      # Environment variables for API keys, database URIs
├── package.json              # Node.js dependencies and scripts
├── README.md                 # Project documentation
├── /src                      # Main backend source code
│   ├── server.js             # Entry point for the Node.js app
│   ├── /config               # Configuration files (DB connection, app settings)
│   │   ├── db.js             # Database connection setup using Mongoose
│   │   └── env.js            # Environment variable configuration
│   ├── /controllers          # Controllers for request handling
│   │   ├── newsController.js # News handling logic
│   │   ├── staffController.js # Staff handling logic
│   │   └── authController.js # Authentication logic
│   ├── /models               # Mongoose models for data structure
│   │   ├── News.js           # News schema
│   │   ├── Staff.js          # Staff schema
│   │   ├── User.js           # User schema
│   │   └── Branch.js         # Branch schema
│   ├── /routes               # API routes
│   │   ├── newsRoutes.js     # Routes for news-related endpoints
│   │   ├── staffRoutes.js    # Routes for staff-related endpoints
│   │   ├── authRoutes.js     # Routes for authentication
│   │   └── index.js          # Combines all routes for easy import
│   ├── /middlewares          # Middleware for validation, authentication, error handling
│   │   ├── authMiddleware.js # JWT authentication check
│   │   └── errorMiddleware.js # Error handling middleware
│   ├── /services             # Business logic layer (optional)
│   │   ├── newsService.js    # Handles business logic for news
│   │   └── userService.js    # Handles business logic for users
│   ├── /utils                # Utility functions (logging, helpers, constants)
│   │   ├── logger.js         # Logger utility
│   │   └── constants.js      # Constants and enums
│   └── /views                # Templates for frontend (e.g., ejs, handlebars for admin)
│       ├── adminDashboard.ejs  # Admin dashboard for management
│       └── clientDashboard.ejs # Client dashboard for academy browsing
└── client                    # React frontend application (separate project if desired)
    ├── public                # Static files for React app
    ├── src                   # React source code
    │   ├── App.js            # Main React app file
    │   ├── index.js          # React entry point
    │   ├── /components       # Reusable components
    │   ├── /pages            # Pages for different views (News, Staff, etc.)
    │   └── /services         # Services for API calls to backend
    └── package.json          # Dependencies for React app
