<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">Blog</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
      <ul>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Account
          </a>
          <ul class="dropdown-menu dropdown-menu-lg-end">
            <li><router-link class="nav-link header-item" to="/posts/new">New Post</router-link></li>
            
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>
<script>
export default {
    name: 'Navbar',
    
}
</script>
<style scoped>
ul{
    list-style: none;
}
a{
    text-decoration: none;
    color:#000;
}
span{
  text-decoration: none;
  cursor: pointer;
  color: #000;
}
</style>