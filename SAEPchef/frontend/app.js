const menu = document.querySelector('#menu-lateral');

async function abrirMenuLateral() {
    const dados = await (await fetch('/api/perfil')).json();
    document.querySelector('#total-favoritos').textContent = dados.favoritos;
    document.querySelector('#total-receitas').textContent = dados.receitas;
    menu.classList.remove('oculto');
}

document.querySelector('#fechar-menu')
    .addEventListener('click', () => menu.classList.add('oculto'));

document.querySelector('#form-busca').addEventListener('submit', async (e) => {
    e.preventDefault();
    const erro = document.querySelector('#erro-busca');
    erro.textContent = '';
    
    // Tira o @ se o usuário digitou, e remove espaços das pontas
    const termo = document.querySelector('#campo-busca').value.trim().replace('@', '');
    
    // Validação de formato: letras e números, sem espaço nem símbolo
    if (!/^[a-zA-Z0-9_]+$/.test(termo)) {
        erro.textContent = 'Formato inválido. Exemplo: chef1';
        return;
    }
    
    const receitas = await (await fetch(
        `/api/receitas?chef=${encodeURIComponent(termo)}`
    )).json();
    
    if (receitas.length === 0) {
        erro.textContent = 'Chef não encontrado';
        return;
    }
    
    estado.chefFiltrado = termo; 
    await carregarMural();
});

document.querySelector('#btn-logout').addEventListener('click', async () => {
    await fetch('/api/logout', { method: 'POST' });
    estado.chefFiltrado = ''; 
    document.querySelector('#campo-busca').value = '';
    menu.classList.add('oculto'); 
    document.querySelector('#tela-receitas').classList.add('oculto');
    document.querySelector('#mural').classList.remove('oculto');
    await carregarSessao(); 
    await carregarMural(); 
});