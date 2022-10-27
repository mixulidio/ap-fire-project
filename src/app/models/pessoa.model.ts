
export interface Pessoa {
  id: String,
  nome: String,
  cpf: Number,
  rg: Number,
  dataNascimento:  Date ,
  email: String,

  endereco: {
      cep: String,
      logradouro: String,
      numero: String,
      complemento: String,
  },
  estadoCivil: String,
  profissao: String,


  img: {
      data: Buffer,
      contentType: String
  },

  dataCriacao : Date,

}
