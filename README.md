# RSS para Físicos

Este es el repositorio de una aplicación web basada en React que permite a los estudiantes de física mantenerse actualizados con las últimas noticias y avances en el campo de la física y la ciencia en general. Esta aplicación está basada en el proyecto original creado por [@hauyeung](https://bitbucket.org/hauyeung/), cuyo trabajo puede ser visualizado [aquí](https://bitbucket.org/hauyeung/react-rss-tutorial-app/src/master/).

## Características principales

La aplicación tiene un propósito definido: facilitar el acceso a información reciente y relevante en el campo de la física a través de la lectura de feeds RSS. Sus características destacadas son:

1. *Extracción y visualización de feeds RSS*: La aplicación toma las fuentes RSS proporcionadas por el usuario y las presenta en un formato fácil de leer.
2. *Carga infinita*: El uso del scroll infinito en la página principal permite cargar continuamente más artículos a medida que el usuario se desplaza por la página.
3. *Gestión de fuentes*: Los usuarios tienen la capacidad de añadir y eliminar sus fuentes de feeds RSS según sus preferencias.

## Guía de Instalación y Uso

Para instalar y utilizar esta aplicación, siga los pasos a continuación:

1. Clone el repositorio con el comando `git clone https://github.com/caefisica/rss-reader.git`
2. Ingrese al directorio del proyecto con `cd rss-reader`
3. Instale las dependencias necesarias con `npm i`
4. Inicie la aplicación con `npm run start`

Nota: El desarrollador utiliza `Node v14.21.3` y `npm 6.14.8`

Las páginas principales de la aplicación son:

- `HomePage`: Página principal que extrae y muestra las fuentes RSS. Se carga más contenido automáticamente al desplazarse hacia abajo.
- `SourcesPage`: Página que permite la adición y eliminación de fuentes de feeds RSS.

## Errores y Problemas Conocidos

Hasta el momento, no se han identificado errores o problemas específicos. Sin embargo, si se encuentra algún error durante el uso de la aplicación, se solicita reportarlo a través de la sección "Issues" de este repositorio de GitHub.

## Contribución al Proyecto

Se invita a otros desarrolladores a contribuir a este proyecto. Para hacerlo, por favor siga los siguientes pasos:

1. Haga un "fork" del repositorio
2. Cree una nueva rama en su "fork" para sus modificaciones
3. Realice los cambios necesarios y pruébelos correctamente
4. Envíe un "Pull Request" detallando los cambios realizados

# Licencia

Este proyecto se encuentra bajo la Licencia MIT. Para más detalles, por favor, consulte el archivo [LICENCE](LICENSE).
