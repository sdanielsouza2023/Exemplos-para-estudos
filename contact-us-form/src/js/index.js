const $stepText = $('#step-text')
const $stepDescription = $('#step-description')
const $stepOne = $('.step.one')
const $stepTwo = $('.step.two')
const $stepThree = $('.step.three')

const $containerBtnFormOne = $('#containerBtnFormOne')
const $btnFormOne = $('#btnFormOne')

const $inputNome = $('#nome')
const $inputSobreNome = $('#sobrenome')
const $inputDataNascimento = $('#dataNascimento')
const $inputEmail = $('#email')
const $inputMinibio = $('#minibio')
const $inputEndereco = $('#endereco')
const $inputComplemento = $('#complemento')
const $inputCidade = $('#cidade')
const $inputCep = $('#cep')

let nomeValido = false
let sobreNomeValido = false
let dataNascimentoValido = false
let emailValido = false
let enderecoValido = false
let cidadeValida = false
let complementoValido = false
let cepValido = false

const minLengthText = 2
const minLengthTextArea = 10
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const cepRegex = /^\d{5}-\d{3}$|^\d{8}$/

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
function iniciarFormularioTwo() {
  $stepText.text('Passo 2 de 3 - Dados correspondência')
  $stepDescription.text('Precisamos desses dados para que possamos entrar em contato se necessário')
  $stepOne.hide()
  $stepTwo.show()

  $inputEndereco.keyup(function () {
    enderecoValido = validarInput(this,
      minLengthTextArea)
  })

  $inputCidade.keyup(function () {
    cidadeValida = validarInput(this, minLengthText)
  })
  console.log($inputCep)
  $inputCep.keyup(function () {
    this.value = this.value.replace(/\D/g, '')
    cepValido = validarInput(this, null, null, cepRegex)
    if (cepValido) {
      this.value = this.value.replace(cepRegex, "$1.$2-$3")
    }
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