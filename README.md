# express-graphql

Basic express GraphQL setup with mock data for testing graphql queries and mutations

Run development enviroment using yarn

```
1. yarn
2. yarn dev
3. navigate: http://localhost:4000

```
```
Para que usamos .nvmrc ?
 Para poder decirle a NODE, con que version queremos correr el server.
 En este caso, estamos usando la v12.16.2, porque es la last stable version.

```

```
Para que usamos .babelrc ?
 Para tener la capacidad de usar algunas funciones de JavaScript que todavia no estan en NODEJS.

Que es .babelrc?
 
```

```
Para que usamos .eslintrc ?
 
```


```
GraphQL
```

```Example mutation```

````mutation{
  createUser(input:{
    first_name: "Thomas",
    last_name: "Beckford"
    phone: "114265796"
  })
  {
    first_name
    last_name
    preferred_name
    phone
  }
}````

