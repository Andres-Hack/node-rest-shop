<p align="center">
  <a href="https://nodejs.org/">
    <img
      alt="Node.js"
      src="https://nodejs.org/static/images/logo-light.svg"
      width="400"
    />
  </a>
</p>

Un proyecto completo de REST con NodeJS de la parte de Back-end  utilizando como motor de base de datos MongoDB, tambien usando auth JWT para las consultas mas usadas , subida de archvos como ser imagenes y restricción de rutas, etc...

## Requerimientos

* Node 8.15
* MongoDB
* Contentful CLI (only for write access)

Sin ningún cambio, esta aplicación está conectada a un API REST. Para experimentar la experiencia completa de REST FULL de extremo a extremo. Esto le permite ver cómo funciona la edición de contenido en la aplicación REST FULL y cómo los cambios de contenido se propagan a esta aplicación.

## Comenzar

Clona el repositorio e instala las dependencias.

```bash
git clone https://github.com/Andres-Hack/node-rest-shop.git
cd node-rest-shop
```

```bash
npm install
```

## A volar ...

Para iniciar el servidor express, ejecute lo siguiente

```bash
npm start
```

Ingrese [http://localhost:3000](http://localhost:3000) y mire las rutas que necesite en la carpeta *./api/routes/*.
