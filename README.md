# Catálogo Mobile - E-commerce App

Aplicativo móvel desenvolvido como projeto integrador da disciplina de **Mobile Development**. O projeto consiste em um catálogo de e-commerce completo utilizando o ecossistema React Native e Expo.

---

## 🚀 Funcionalidades Implementadas

- **Autenticação com Validação:** Tela de login com validação de campos obrigatórios (alerta para campos vazios) e gerenciamento de estado.
- **Navegação Híbrida (React Navigation):** 
  - **Bottom Tabs:** Abas inferiores para rápida alternância entre as categorias *Masculino* e *Feminino*.
  - **Stack Navigation:** Transição fluida da listagem para a tela de detalhes do produto.
- **Consumo de API REST (Axios):** Integração com a API externa `DummyJSON` para carregamento dinâmico dos produtos e detalhes.
- **Gerenciamento de Estado Global (Redux Toolkit):** Controle do fluxo de autenticação e sessão do usuário (`login` e `logout`).
- **Detalhes e Promoções:** Exibição da foto, nome, descrição, preço formatado em BRL (R$) e badge dinâmico de desconto (`% OFF`).

---

## 🛠️ Tecnologias Utilizadas

- **React Native** & **Expo** (SDK 57)
- **React Navigation** (Bottom Tabs & Native Stack)
- **Redux Toolkit** (Gerenciamento de Estado)
- **Axios** (Cliente HTTP)

---

## 📱 Como Executar o Projeto Localmente

1. **Pré-requisitos:**
   - Possuir o [Node.js](https://nodejs.org/) instalado.
   - Aplicativo **Expo Go** instalado no celular.

2. **Clonar o Repositório:**
   ```bash
   git clone [https://github.com/GuilhermeLima05/catalogo-mobile-app.git](https://github.com/GuilhermeLima05/catalogo-mobile-app.git)
   cd catalogo-mobile-app
