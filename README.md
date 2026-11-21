# Nuestro menú

Una web para el móvil con el menú semanal del nutricionista, la lista de la compra y las recetas. Sin base de datos ni cuentas, gratis.

- **Hoy**: lo que toca comer ahora mismo, en grande, con acceso a la receta.
- **Semana**: el menú de cada día y las pautas del nutricionista.
- **Compra**: la lista de la semana para los dos. Marcas lo que coges y puedes añadir cosas. Las marcas se guardan en cada móvil.
- **Recetas**: ingredientes (puedes marcarlos al sacarlos) y pasos.

Todas las cantidades son para 2 personas (el menú original viene para 1).

## Cómo se actualiza

El único archivo con contenido es `data.js`. Cuando llegue un menú nuevo, se le pasa a Claude y Claude:

1. Transcribe el menú y las recetas a `data.js` con las cantidades ×2.
2. Calcula la lista de la compra sumando todo lo de la semana.
3. Cambia el `id` del menú, así la lista de la compra empieza de cero.
4. Hace `git push` y GitHub Pages lo publica en 1 o 2 minutos.

## Publicar en GitHub Pages (una sola vez)

```bash
cd ~/menu-semanal
gh repo create menu-semanal --public --source . --push
gh api repos/{owner}/menu-semanal/pages -X POST -f "source[branch]=main" -f "source[path]=/"
```

La web queda en `https://<tu-usuario>.github.io/menu-semanal/`. En el móvil, ábrela y usa «Añadir a pantalla de inicio» para tenerla como una app.

GitHub Pages gratis necesita un repositorio público: cualquiera con el enlace podría ver el menú (no hay datos personales en él).

## La lista de la compra

Cada móvil guarda sus propias marcas (en el propio navegador). No hay base de datos ni servicios externos. Si compráis los dos a la vez, lo más práctico es repartiros las secciones.

Funciona sin cobertura una vez abierta la web al menos una vez.
