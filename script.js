const form = document.querySelector('form')
const nomeFuncionario = document.querySelector('#nomeFuncionario')
const cargoFuncionario = document.querySelector('#cargoFuncionario')
const salFuncionario = document.querySelector('#salFuncionario')
const exibeFuncionarios = document.querySelector('#exibeFuncionarios')
let listaFuncionarios = []

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const nome = nomeFuncionario.value.trim('')
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/.test(nome)
    const cargo = cargoFuncionario.value.trim('')
    const salario = Number(salFuncionario.value)

    if(!nome || !regex) return alert('insira um nome valido')   
    if(!cargo) return alert('insira um cargo valido')   
    if(!salario) return alert('insira um salario valido')   

    const funcionario = new criaFuncionario(nome, cargo, salario)
    adicionarFuncionario(funcionario)
    renderizaFuncionarios(listaFuncionarios)
    console.log(listaFuncionarios)
})

function criaFuncionario(nome, cargo, salario) {
    this.nome = nome
    this.cargo = cargo
    this.salario = salario
}

function adicionarFuncionario(funcionario) {
    listaFuncionarios = [...listaFuncionarios, funcionario]
    nomeFuncionario.value = ''
    cargoFuncionario.value = ''
    salFuncionario.value = ''

    nomeFuncionario.focus()
}

function renderizaFuncionarios(lista) {
    exibeFuncionarios.innerHTML = ''

    lista.forEach((funcionario) => {
        const { nome, cargo, salario } = funcionario
        
        const func = document.createElement('div')
        func.classList.add('func')

        const p = document.createElement('p')
        p.textContent = `Nome: ${nome}, Cargo: ${cargo}, Salário: ${salario}`
        
        const btnDel = document.createElement('button')
        btnDel.classList.add("delete")
        btnDel.setAttribute('type', 'button')
        btnDel.innerText = "delete"
        
        func.append(p, btnDel)
        btnDel.addEventListener('click',(e)=>{
            const index = listaFuncionarios.indexOf(funcionario)
            if(index > -1){//verifica se o index é válido
                listaFuncionarios.splice(index, 1)//remove o funcionário da lista
                renderizaFuncionarios(listaFuncionarios)
            }
        })
        exibeFuncionarios.append(func)
    })
}