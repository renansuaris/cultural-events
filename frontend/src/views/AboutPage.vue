<template>
  <main>
    <section class="hero-section">
      <div class="container">
        <h1>Muito mais que eventos.</h1>
        <p class="hero-subtitle">Conectando pessoas a experiências culturais únicas na nossa cidade.</p>
      </div>
    </section>

    <section class="features-section container">
      <div class="feature-card">
        <div class="icon-circle">
          <font-awesome-icon icon="champagne-glasses" />
        </div>
        <h3>Viva Experiências</h3>
        <p>Descubra shows, teatros e workshops acontecendo perto de você. A cultura local nunca esteve tão acessível.</p>
      </div>

      <div class="feature-card">
        <div class="icon-circle">
          <font-awesome-icon icon="calendar-days" />
        </div>
        <h3>Para Produtores</h3>
        <p>Organize seus eventos de forma simples. Publique, gerencie e alcance seu público em poucos cliques.</p>
      </div>

      <div class="feature-card">
        <div class="icon-circle">
          <font-awesome-icon icon="users" />
        </div>
        <h3>Comunidade</h3>
        <p>Faça parte de uma comunidade apaixonada por arte e entretenimento. Compartilhe momentos.</p>
      </div>
    </section>

    <section class="about-project-section">
      <div class="container">
        <div class="content-box">
          <h2>Sobre o Projeto</h2>
          <p>
            O <strong>Cultural Events</strong> nasceu como um projeto acadêmico 
            com o objetivo de conectar pessoas a eventos de maneira simples e intuitiva.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); /* Azul Sympla adaptado */
  color: white;
  padding: 5rem 1rem;
  text-align: center;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 1rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.icon-circle {
  width: 70px;
  height: 70px;
  background-color: #e3f2fd;
  color: #007bff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin: 0 auto 1.5rem auto;
}

.feature-card h3 {
  color: #333;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.about-project-section {
  background-color: #f8f9fa;
  padding: 4rem 1rem;
}

.content-box {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.content-box h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.content-box p {
  color: #555;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>