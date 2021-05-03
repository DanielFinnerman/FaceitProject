# FaceitProject

React application with GraphQL API integration using Express, Mongoose (MongoDB Atlas, Apollo Server and React Semantic UI).
App also uses [Faceit API](https://developers.faceit.com/docs/tools/data-api) to display stats of [Faceit.com](https://www.faceit.com/en) users.

Create blog posts, comment and like them. Display stats of [Faceit.com](https://www.faceit.com/en) users.

Front end: https://faceit-blog.netlify.app/
(might not always work as jelastic backend goes after not using for 5min)

GraphQL in jelastic: https://faceit-blog.jelastic.metropolia.fi/

Example GraphQL queries: 

# User
### Register
```
mutation {
  register(registerInput:{
  username:"username"
  password:"1234"
  confirmPassword:"1234"
  email:"user@email.com"
 }){
    id
  email
  token
  username
  createdAt}
}
```
### Login
```
mutation{
  login(username: "username", password:"1234") {
    id
    email
    token
    username
    createdAt
  }
}
```
### Create post
```
mutation{
  createPost(body:"post body"){
    id
    body
    createdAt
    username
  }	
}

HTTP HEADER:
{
  "Authorization":"Bearer [login-token]"
}
```

### Get posts
```
query{
  getPosts{
    id
    body
    username
    createdAt
  }
}
```

## Example Stats page faceit.com fetch queries:
```
s1mple
allu
KRIMZ
```

