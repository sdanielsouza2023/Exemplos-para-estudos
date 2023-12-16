const $stepText = $('#step-text')
const $stepDescription = $('#step-description')
const $stepOne = $('.step.one')
const $stepTwo = $('.step.two')
const $stepThree = $('.step.three')
// botao parte 1
const $containerBtnFormOne = $('#containerBtnFormOne')
const $btnFormOne = $('#btnFormOne')
// botao parte 2
const $containerBtnFormTwo = $('#containerBtnFormTwo')
const $btnFormTwo = $('#btnFormTwo')
// botao parte 3
const $containerBtnFormThree = $('#containerBtnFormThree')
const $btnFormThree = $('#btnFormThree')
// const parte 1 
const $inputNome = $('#nome')
const $inputSobreNome = $('#sobrenome')
const $inputDataNascimento = $('#dataNascimento')
const $inputEmail = $('#email')
const $inputMinibio = $('#minibio')
// const parte 2
const $inputEndereco = $('#endereco')
const $inputComplemento = $('#complemento')
const $inputCidade = $('#cidade')
const $inputCep = $('#cep')
// const parte 3
const $textareaHabilidades = $('#habilidades')
const $textareaPontosFortes = $('#pontosForte')
const $title = $('#title')

let nomeValido = false
let sobreNomeValido = false
let dataNascimentoValido = false
let emailValido = false
let enderecoValido = false
let cidadeValida = false
let complementoValido = false
let cepValido = false
let textareaHabilidades = false
let textareaPontosFortes = false


const minLengthText = 2
const minLengthTextArea = 10
const maxLengthTextArea = 1000

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const cepRegex = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/

function validarInput(element, minLength, maxLength, regex) {
  const closest = $(element).closest('.input-data')
  if (!element.value
    || (minLength && element.value.trim().length < minLength)
    || (maxLength && element.value.trim().length > maxLength)
    || (regex && !element.value.toLowerCase().match(regex))
  ) {
    closest.addClass('error')
    return false
    //invalid
  }
  //valido
  closest.removeClass('error')
  return true
}

// aqui comeca a parte do segundo formulario
function iniciarFormularioTwo() {
  $stepText.text('Passo 2 de 3 - Dados correspondência')
  $stepDescription.text('Precisamos desses dados para que possamos entrar em contato se necessário')
  $stepOne.hide()
  $stepTwo.show()

  $inputEndereco.keyup(function () {
    enderecoValido = validarInput(this, minLengthTextArea)
    console.log("endereco1:", enderecoValido)
    validarFormularioTwo()
    console.log("endereco2:", enderecoValido)
  })

  $inputCidade.keyup(function () {
    cidadeValida = validarInput(this, minLengthText)
    validarFormularioTwo()
    console.log("cidadeValida:", cidadeValida)
  })

  $inputCep.keyup(function () {
    this.value = this.value.replace(/\D/g, '')
    cepValido = validarInput(this, null, null, cepRegex)
    if (cepValido) {
      this.value = this.value.replace(cepRegex, "$1.$2-$3")
    }
    console.log("Cep:", cepValido)
    validarFormularioTwo()
    console.log("Cep:", cepValido)
  })
  $inputComplemento.keyup(function () {
    validarFormularioTwo()
  })
}
function validarFormularioUm() {
  if (nomeValido && sobreNomeValido && emailValido && dataNascimentoValido) {
    $containerBtnFormOne.removeClass('disabled')
    $btnFormOne.removeClass('disabled')
    $btnFormOne.off('click').on('click', iniciarFormularioTwo)
  } else {
    $containerBtnFormOne.addClass('disabled')
    $btnFormOne.addClass('disabled')
    $btnFormOne.off('click')
  }
}
function validarFormularioTwo() {
  if (enderecoValido && cidadeValida && cepValido) {
    $containerBtnFormTwo.removeClass('disabled')
    $btnFormTwo.removeClass('disabled')
    $btnFormTwo.off('click').on('click', iniciarFormularioThree);
  } else {
    $containerBtnFormTwo.addClass('disabled')
    $btnFormTwo.addClass('disabled')
    $btnFormTwo.off('click');
  }
}

// parte do terceito formulario
function validarFormularioThree() {
  if (textareaHabilidades && textareaPontosFortes) {
    $containerBtnFormThree.removeClass('disabled')
    $btnFormThree.removeClass('disabled')
    $btnFormThree.off('click').on('click', salvarNotrello);
    console.log
  } else {
    $containerBtnFormThree.addClass('disabled')
    $btnFormThree.addClass('disabled')
    $btnFormThree.off('click');
  }
}
function finalizarFormulario() {
  $stepThree.hide()
  $stepDescription.hide()
  $title.text('Inscrição realizada com sucesso!')
  $stepText.text('Obrigado por sua inscrição, entraremos em contato assim que possível, nosso prazo de análise e de cinco dias úteis')

}
console.log(salvarNotrello())
async function salvarNotrello() {
  try {
    const nome = $inputNome.val()
    const sobrenome = $inputSobreNome.val()
    const email = $inputEmail.val()
    const dataNascimento = $inputDataNascimento.val()
    const minibio = $inputMinibio.val()
    const endereco = $inputEndereco.val()
    const complemento = $inputComplemento.val()
    const cidade = $inputCidade.val()
    const cep = $inputCep.val()
    const habilidades = $textareaHabilidades.val()
    const pontosForte = $textareaPontosFortes.val()

    if (!nome || !sobrenome || !email || !dataNascimento || !endereco || !cidade || !cep || !habilidades || !pontosForte) {
      return alert('Preencha todos os campos')
    }
    const body = {
      name: "Candidato - " + nome + " " + sobrenome,
      desc: `
        Seguem dados do cantidato(a):
                --------------------Dados Pessoais ---------------------
                Nome: ${nome}
                Sobrenome: ${sobrenome}
                Email: ${email}
                Data nascimento: ${dataNascimento}
                Minibio: ${minibio}
                ------------------- Dados de Endereço ------------
                Endereço: ${endereco}
                Complemento: ${complemento}
                Cidade: ${cidade}
                CEP: ${cep}
                ------------------- Dados Pontos Fortes ------------
                Habilidades: ${habilidades}
                Pontos Fortes: ${pontosForte}
          `
    }

    await fetch('https://api.trello.com/1/cards?idList=6572770277b2d48ae5522ae9&key=ddd6be97248af3f47885dd899c839b24&token=ATTA9e6af50ab073da78c8e6e20d730fc441f973fca486319fa9249ccc9f0cc618910A4ACAE2', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      }, body: JSON.stringify(body)
    })
    return finalizarFormulario()
  } catch (e) {
    console.log('Ocorreu erro ao salvar no trello:', e)
  }
}
function iniciarFormularioThree() {
  $stepText.text('Passo 3 de 3 - Dados pessoais')
  $stepDescription.text('Conte-nos mais sobre suas habilidades técnicas e postos positivos.')
  $stepTwo.hide()
  $stepThree.show()


  $textareaHabilidades.keyup(function () {
    textareaHabilidades = validarInput(this, minLengthTextArea, maxLengthTextArea)
    validarFormularioThree()
    console.log(textareaHabilidades, "Habilidades")
  })

  $textareaPontosFortes.keyup(function () {
    textareaPontosFortes = validarInput(this, minLengthTextArea, maxLengthTextArea)
    validarFormularioThree()
    console.log(textareaPontosFortes, "Pontos Fontes")
  })
}


function init() {
  $stepText.text('Passo 1 de 3 - Dados pessoais')
  $stepDescription.text('Descreva seus dados para que possamos te conhecer melhor')
  $stepTwo.hide()
  $stepThree.hide()

  $inputNome.keyup(function () {
    nomeValido = validarInput(this, minLengthText)
    validarFormularioUm()
  })

  $inputSobreNome.keyup(function () {
    sobreNomeValido = validarInput(this, minLengthText)
    validarFormularioUm()
  })
  $inputDataNascimento.keyup(function () {
    dataNascimentoValido = validarInput(this, minLengthText)
    validarFormularioUm()
  })
  $inputDataNascimento.change(function () {
    dataNascimentoValido = validarInput(this, minLengthText)
    validarFormularioUm()
  })
  $inputDataNascimento.on('focus', function () {
    this.type = 'date'
    validarFormularioUm()
  })

  $inputDataNascimento.on('blur', function () {
    this.type = 'text'
    validarFormularioUm()
  })
  $inputEmail.keyup(function () {
    emailValido = validarInput(this, null, null, emailRegex)
    validarFormularioUm()
  })

  $inputMinibio.keyup(function () {
    validarFormularioUm()
  })
}

init()