function sum(a, b) {
  const firstNumber = Number(a)
  const secondNumber = Number(b)

  if (isNaN(firstNumber) || isNaN(secondNumber)) {
    throw new Error('arguments must be two numbers')
  }
  return firstNumber + secondNumber
}
try {
  console.log(sum(2, 9))
  console.log(sum(true, 14))
  console.log(sum(undefined, 22))// Linha que esta o erro, o codigo para aqui!!! e cai no catch passando a tratativa de erro so entao ele execulta o finally e outro codigo logo a frente ou seja o olhar mundo
  console.log(sum(18, "0"))
  console.log(sum(39, null))
  console.log(sum(13, "zero"))
} catch (e) {
  //console.log(e)
  console.log(e.message)
  console.log("An error ocurred!")
} finally {
  console.log("Calculations Finished!!!")
}
console.log("Ola mundo 1")
