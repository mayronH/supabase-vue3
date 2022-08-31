<script setup lang="ts">
import { onMounted, ref } from 'vue'
const navBtn = ref()

onMounted(() => {
  if (navBtn.value) {
    navBtn.value.addEventListener('click', () => {
      const isExpanded = navBtn.value.getAttribute('aria-expanded')
      if (isExpanded == 'true') {
        navBtn.value.setAttribute('aria-expanded', 'false')
      }
      if (isExpanded == 'false') {
        navBtn.value.setAttribute('aria-expanded', 'true')
      }
    })
  }
})
</script>
<template>
  <header>
    <nav class="header">
      <div class="nav-wrapper">
        <div class="logo">
          <router-link to="/" aria-label="link to home"> 🥤 </router-link>
        </div>

        <button
          ref="navBtn"
          class="btn-menu"
          type="button"
          aria-expanded="false"
          aria-controls="menu"
          aria-label="open mobile nav"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <ul id="menu" class="nav-links" role="menubar">
          <li role="none">
            <router-link to="/" role="menuitem" class="nav-link"
              >Home</router-link
            >
          </li>

          <li role="none">
            <router-link to="/create" role="menuitem" class="nav-link"
              >Create New Smoothie</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<style scoped>
.header {
  padding: 0.8rem 1.25rem;
  background-color: hsl(var(--bg-medium));
  width: 100%;
}
.logo {
  font-size: var(--medium-size-fluid);
}
.logo a {
  text-decoration: none;
}
.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: var(--extra-small-size-fluid) var(--medium-size-fluid);
}
.nav-links {
  position: absolute;
  top: calc(50px + 2 * var(--extra-small-size-fluid));
  left: 0;
  right: 0;
  z-index: 20;

  list-style: none;
  text-align: center;

  padding: 1.5rem;

  background-color: hsl(var(--bg-medium));

  border-bottom: 2px solid hsl(var(--accent));

  transform: translate3d(0, -200%, 0);
  transition: transform 0.2s cubic-bezier(0.64, 0.04, 0.26, 0.87);
}
.btn-menu {
  display: grid;
  place-items: center;
  padding-inline: 1rem;

  cursor: pointer;

  color: hsl(var(--accent));

  background-color: transparent;

  border: none;
}
.btn-menu[aria-expanded='true'] + .nav-links {
  transform: translate3d(0, 0, 0);
}
.nav-links li {
  display: block;
  padding: 5px 0px;
}
.nav-link {
  color: hsl(var(--text));
  text-decoration: none;
}
.nav-link:is(:hover, :focus-within) {
  color: hsl(var(--accent3));
}
.nav-link:focus-visible {
  outline: 1px solid hsl(var(--accent3));
  outline-offset: var(--extra-small-size-fluid);
}
@media (min-width: 768px) {
  .header {
    padding: 0.8rem 1rem;
  }
  .nav-wrapper {
    justify-content: space-between;
  }
  .btn-menu {
    display: none;
  }
  .nav-links {
    position: static;
    display: flex;
    align-items: center;
    transform: translate3d(0, 0, 0);
    border-bottom: 0;
    z-index: 0;
    padding: 0;
    inset: 0;
    background-color: transparent;
  }
  .nav-links li {
    display: inline;
    padding: 0px 5px;
  }
  li,
  .nav-link {
    width: initial;
  }
}
</style>
