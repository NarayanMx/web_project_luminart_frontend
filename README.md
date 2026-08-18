# 🎨 Luminart — Galería de Arte Interactiva

Aplicación web Single Page Application (SPA) desarrollada con React que permite explorar, filtrar y guardar obras históricas en alta resolución consumiendo la API del Museo Metropolitano de Arte de Nueva York (The MET).

---

## 🔗 Enlaces y Demostración

* **Demostración en vivo (Live Demo):[https://narayanmx.github.io/web_project_luminart_frontend/]
* **Repositorio en GitHub:** [https://github.com/NarayanMx/luminart](https://github.com/NarayanMx/luminart)

---

## 🎯 Desafío (Problemática)

Diseñar y desarrollar una plataforma inmersiva de alto rendimiento visual capaz de manejar y presentar datos masivos provenientes de una API externa, garantizando una navegación fluida, búsqueda dinámica por múltiples criterios y la seguridad en la persistencia de datos y rutas privadas de usuario.

---

## ⚙️ Proceso y Tecnologías Utilizadas

El desarrollo se estructuró de forma modular bajo la metodología **BEM** para los estilos y la arquitectura de componentes de **React**:

* **Frontend & SPA:** React 18, Vite, JSX, React Router DOM v6 (rutas protegidas con `ProtectedRoute`).
* **Estilos:** CSS3 modular responsivo siguiendo la convención BEM.
* **Integración de APIs:** Peticiones asíncronas a la REST API de *The Metropolitan Museum of Art Collection*.
* **Persistencia & Estado:** `localStorage` para la conservación de la colección personal y sesión activa.

---

## 🚀 Resultado e Impacto

* **Experiencia de Usuario Fluida:** Galería dinámica inicial de carga aleatoria y paginación acumulativa (*"Descubrir más"*) que optimiza los tiempos de respuesta.
* **Motor de Búsqueda Completo:** Filtrado en tiempo real por artista, periodo, cultura o movimiento artístico.
* **Gestión de Colección Personal:** Espacio privado para guardar y remover obras favoritas sin pérdida de estado tras recargar la página.
* **Seguridad y Control de Acceso:** Sistema completo de Autenticación (`/signup` y `/signin`) restringiendo vistas privadas únicamente a usuarios autenticados.

---

## 🛠️ Funcionalidades Clave

* **Galería Viva:** Carga de piezas de forma aleatoria al iniciar la aplicación.
* **Visualización en Alta Resolución:** Modal interactivo para detalles técnicos, autoría y fechas.
* **Rutas Protegidas:** Componentes envolventes que resguardan el acceso a secciones de usuario.