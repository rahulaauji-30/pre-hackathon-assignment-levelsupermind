{
  "version": 2,
  "builds": [
    {
      "src": "main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/",
      "dest": "/"
    },{
    "src":"/chat",
    "dest":"/"
    }
  ]
}
