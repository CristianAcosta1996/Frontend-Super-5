# Super5 Frontend

![Esta es una imagen de ejemplo](https://i.ibb.co/ckRnGtW/logo-Super5fondo-Blancobanner.jpg)

### Que es super5?

**Super5** es un proyecto universitario acerca de un sistema de compras online, el cual tiene el objetivo reforzar los distintos conocimientos adquiridos durante la carrera de Tecnólogo en Informática. A continuación se presenta un resumen de las distintas etapas que tuvo este proyecto:

1. Definiciones de roles dentro del equipo, estado del arte (estudio de la realidad de negocio e investigación de otras
   aplicaciones similares ya existentes), investigación y evaluación de las tecnologías a utilizar.
2. Análisis y diseño de la aplicación.
3. Implementación de la solución y testing de la misma.

---

### Propuesta del proyecto:

La propuesta era desarrollar una versión inicial de un sistema online de compras a supermercados, en el cual se registrarán las distintas sucursales de la cadena de supermercados (que permitirán
comprar por internet los mismos productos ofrecidos en las góndolas de las sucursales) y clientes (que comprarán dichos productos en forma online).
El sistema cuenta con tres perfiles de usuario:

1. **administrador**, que accederá vía web y realizará
   tareas de administración de usuarios y manejo de información variada del sistema;
2. **sucursal**, que accederá vía web, atenderá los pedidos realizados por los clientes y gestionará los envíos de los mismos o retiro en la sucursal;
3. **comprador**, que accederá vía web y mobile (en forma
   obligatoria mediante Android, en forma opcional mediante IOS) para comprar productos. Para el acceso mobile, se deberá desarrollar una aplicación que deberá instalarse en el dispositivo (no se accederá vía web desde el navegador del dispositivo).

---

### Como utilizar la aplicacion localmente:

> Nota: Para un correcto funcionamiento de super5 es necesario levantar todos los componentes de la aplicación (Frontend, Backend y Base de datos).
> Para más información sobre el Backend visitar el siguiente link:
> [Repositorio Backend](https://github.com/agusandrade1983/backend)

### Modo desarrollador:

Lo primero a realizar es clonar este repositorio:
`	git clone https://github.com/CristianAcosta1996/Frontend-Super-5.git`
luego se instalan las dependencias del archivo package.json:
`	yarn`
Para levantar la aplicación en modo desarrollador se deben ejecutar los comandos siguientes:
`	yarn dev`

### Modo producción:

> En caso de querer realizar un deploy en la nube se debera realizar los siguiente pasos.

Para realizar el bundler final de la aplicación y obtener la carpeta **dist** lista para ser desplegada a producción, es necesario ejecutar los siguientes comandos:
`yarn build`

Una vez obtenida la carpeta **dist** la aplicación queda lista para ser subida a cualquier hosting en la nube.
