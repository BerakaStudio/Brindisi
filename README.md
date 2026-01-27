# 🍸 Brindisi

**Brindisi** es una guía interactiva de coctelería. Una aplicación diseñada para descubrir, filtrar y aprender a preparar cócteles, ofreciendo una experiencia fluida tanto en web como en escritorio.

Desarrollada por **Beraka Studio**, esta aplicación permite explorar recetas basándose en ingredientes, características y preferencias personales, todo con una interfaz responsiva y cuidada al detalle.

---

## ✨ Características Principales

*   **🔍 Búsqueda Inteligente**: Busca cócteles por nombre, ingredientes, descripción o características.
*   **🏷️ Sistema de Filtrado**: Explora recetas filtrando por ingrediente base (Vodka, Gin, Ron, etc.) o perfil de sabor (Dulce, Seco, Amargo).
*   **❤️ Favoritos**: Guarda tus recetas preferidas para acceder a ellas rápidamente (persistencia local).
*   **🌓 Modo Oscuro/Claro**: Interfaz adaptable con cambio de tema dinámico y persistente.
*   **📱 Diseño Responsivo**: Experiencia optimizada para móviles, tablets y escritorio.

---

## 🛠️ Tecnologías Utilizadas

El proyecto está construido con un stack enfocado en el rendimiento y la experiencia de desarrollo:

*   **Core**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
*   **Enrutamiento**: [React Router DOM](https://reactrouter.com/)
*   **Desktop**: [Electron](https://www.electronjs.org/) + Electron Builder
*   **Iconos**: SVGs inline optimizados y Heroicons (implícito en el diseño).
*   **Datos**: Gestión de contenido mediante archivos JSON estructurados con validación de Schema.

---

## 🚀 Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### Prerrequisitos
*   Node.js (versión 16 o superior recomendada)
*   npm o yarn

### Pasos

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/brindisi.git
    cd brindisi
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Ejecutar en modo desarrollo (Web)**:
    ```bash
    npm run dev
    ```
    Abre `http://localhost:5173` en tu navegador.

4.  **Ejecutar en modo desarrollo (Escritorio/Electron)**:
    ```bash
    npm run electron:dev
    ```
    Esto abrirá la aplicación en una ventana nativa de Electron.

---

## 📜 Scripts Disponibles

| Script | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo web (Vite). |
| `npm run build` | Genera la build de producción para web. |
| `npm run preview` | Previsualiza la build de producción localmente. |

---

## 📂 Estructura de Datos

Brindisi utiliza una "base de datos" local basada en archivos JSON ubicados en `src/data/`. Esto permite una gestión rápida y sencilla del contenido sin necesidad de backend.

*   `recipes.json`: Catálogo completo de recetas.
*   `ingredients.json`: Definición y taxonomía de ingredientes.
*   `characteristics.json`: Etiquetas de perfil de sabor y características.
*   `schema.json`: Esquema de validación para asegurar la integridad de los datos.

Si deseas agregar una nueva receta, asegúrate de seguir la estructura definida en `schema.json`.

---

## 📝 Licencia

Este proyecto es propiedad de **Beraka Studio**.

---
*Hecho con 💚 por Beraka Studio.*
