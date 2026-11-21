# Nuestro menú

Una web para el móvil con el menú semanal del nutricionista, la lista de la compra compartida y las recetas. Sin base de datos propia, gratis.

- **Hoy**: lo que toca comer ahora mismo, en grande, con acceso a la receta.
- **Semana**: el menú de cada día y las pautas del nutricionista.
- **Compra**: la lista de la semana para los dos. Marcas lo que coges y puedes añadir cosas. Si está activada la sincronización, lo que marca uno lo ve el otro al momento.
- **Recetas**: ingredientes (puedes marcarlos al sacarlos) y pasos.

Todas las cantidades son para 2 personas (el menú original viene para 1).

## Cómo se actualiza

El único archivo con contenido es `data.js`. Cuando llegue un menú nuevo, se le pasa a Claude y Claude:

1. Transcribe el menú y las recetas a `data.js` con las cantidades ×2.
2. Calcula la lista de la compra sumando todo lo de la semana.
3. Cambia el `id` del menú, así la lista de la compra empieza de cero en los dos móviles.
4. Hace `git push` y GitHub Pages lo publica en 1 o 2 minutos.

## Publicar en GitHub Pages (una sola vez)

```bash
cd ~/menu-semanal
git init && git add . && git commit -m "Primera versión"
gh repo create menu-semanal --public --source . --push
gh api repos/{owner}/menu-semanal/pages -X POST -f "source[branch]=main" -f "source[path]=/"
```

La web queda en `https://<tu-usuario>.github.io/menu-semanal/`. En el móvil, ábrela y usa «Añadir a pantalla de inicio» para tenerla como una app.

GitHub Pages gratis necesita un repositorio público: cualquiera con el enlace podría ver el menú (no hay datos personales en él).

## Lista compartida entre los dos móviles (opcional, gratis)

Sin esto, cada móvil guarda sus marcas por separado. Para compartirlas se usa Firebase Realtime Database (plan gratuito Spark, sin tarjeta):

1. Entra en <https://console.firebase.google.com> con tu cuenta de Google y crea un proyecto (sin Analytics).
2. Menú **Compilación → Realtime Database → Crear base de datos**. Ubicación: Bélgica (europe-west1). Empieza en **modo bloqueado**.
3. En la pestaña **Reglas**, pega esto y publica:

   ```json
   {
     "rules": {
       "listas": {
         "$lista": { ".read": true, ".write": true }
       }
     }
   }
   ```

4. Copia la URL que aparece arriba (algo como `https://tu-proyecto-default-rtdb.europe-west1.firebasedatabase.app`) y pégala en `config.js`:

   ```js
   window.SYNC_URL = "https://tu-proyecto-default-rtdb.europe-west1.firebasedatabase.app";
   ```

5. Sube el cambio (`git commit -am "Sincronización" && git push`).

En la pantalla Compra verás «Compartida en vivo» con un punto verde. Si no hay cobertura en el súper, las marcas se guardan y se envían solas al recuperarla.

Solo se guardan las marcas de la lista y lo que añadáis a mano. Las reglas solo dejan escribir en `listas/`; quien conozca la URL podría tocar la lista, así que no la compartáis.
