# 🎨 Luminart — El arte que ilumina

**Luminart** es una aplicación web interactiva desarrollada con **React** que permite a los usuarios explorar la vasta colección del **Museo Metropolitano de Arte de Nueva York (The MET)**. La plataforma ofrece una experiencia inmersiva para descubrir obras históricas, realizar búsquedas en tiempo real, visualizar detalles en alta resolución y gestionar una colección personal de obras favoritas.

---

## 🚀 Funcionalidades Principales

* **Galería Dinámica Inicial:** Carga automáticamente obras aleatorias al iniciar la aplicación para ofrecer una experiencia viva desde el primer segundo.
* **Búsqueda Filtrada:** Motor de búsqueda conectado a la API del MET para explorar por artista, periodo, cultura o movimiento artístico.
* **Paginación Progresiva:** Botón *"Descubrir más"* que acumula gradualmente más piezas en la galería sin perder de vista las anteriores.
* **Visualización en Alta Resolución:** Modal/Popup interactivo para examinar los detalles, fechas y autoría de cada obra.
* **Colección Personal (Favoritos):** Los usuarios registrados pueden guardar o remover obras de su galería privada con almacenamiento persistente local (`localStorage`).
* **Autenticación de Usuarios:** Sistema funcional de Registro (`/signup`) e Inicio de Sesión (`/signin`) con rutas protegidas (`ProtectedRoute`).
* **Sección Informativa:** Vista dedicada (`/about`) sobre el autor y los detalles técnicos del proyecto.

---

## 🛠️ Tecnologías Utilizadas

* **React 18** (Vite / JSX)
* **React Router DOM v6** (Enrutamiento SPA y rutas protegidas)
* **CSS3** (Arquitectura modular basada en la metodología **BEM**)
* **API REST:** [The Metropolitan Museum of Art Collection API](https://metmuseum.github.io/)
* **Local Storage API** (Persistencia de datos del lado del cliente)
* **Git / GitHub** (Control de versiones y flujo de trabajo colaborativo)

---