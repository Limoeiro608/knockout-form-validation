import api from './../api/api.js'
import css from "./style.css"


// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    var self = this

    //nomee
    self.firstName = ko.observable().extend({
        required: {
            params: true,
            message: 'campo obrigatorio'
        },
        minLength: {
            params: 2,
            message: 'Caracteres insuficientes'
        },
        pattern: {
            params: "^[A-Za-zÀ-ú ']+$",
            message: 'Apenas letras'
        }
    }),
        //sobrenome
        self.lastName = ko.observable().extend({
            required: {
                params: true,
                message: 'campo obrigatorio'
            },
            minLength: {
                params: 2,
                message: 'Caracteres insuficientes'
            },
            pattern: {
                params: "^[A-Za-zÀ-ú ']+$",
                message: 'apenas letras'
            }
        }),
        //ddd
        self.ddd = ko.observable().extend({
            required: {
                params: true,
                message: 'campo obrigatorio'
            },
            minLength: {
                params: 2,
                message: 'Caracteres insuficientes'
            },
            maxLength: {
                params: 3,
                message: ' Caracteres excedidos'
            },
            number: {
                params: true,
                message: 'Apenas numeros'
            }
        }),
        //telefonee

        self.numberFone = ko.observable().extend({
            required: {
                params: true,
                message: 'campo obrigatorio'
            },
            minLength: {
                params: 9,
                message: 'Caracteres insuficientes'
            },
            maxLength: {
                params: 9,
                message: ' Caracteres excedidos'
            },
            number: {
                params: true,
                message: 'Apenas numeros'
            }
        }),
        // cep
        self.cep = ko.observable().extend({
            required: {
                params: true,
                message: 'campo obrigatorio'
            },
            minLength: {
                params: 8,
                message: ' Caracteres insuficientes'
            },
            maxLength: {
                params: 8,
                message: ' Caracteres excedidos'
            },
            number: {
                params: true,
                message: 'Apenas numeros'
            }
        })
    // endereço
    self.endereço = ko.observable().extend({
        required: {
            params: true,
            message: 'campo obrigatorio'
        },
        minLength: {
            params: 5,
            message: 'Caracteres insuficientes'
        },
        pattern: {
            params: "^[A-Za-zÀ-ú0-9 ']+$",
            message: 'Apenas letras'
        }
    }),
        // numero da casa
        self.nResidencia = ko.observable().extend({
            required: {
                params: true,
                message: 'campo obrigatorio'
            },
            number: {
                params: true,
                message: 'Apenas numeros'
            }
        }),
        // complemento (opcional)
        self.complemento = ko.observable().extend({
            pattern: {
                params: "^[A-Za-zÀ-ú0-9 ']+$",
                message: 'apenas letras'
            }
        }),
        //bairro
        self.bairro = ko.observable().extend({
            required: {
                params: true,
                message: 'campo obrigatorio'
            },
            minLength: {
                params: 3,
                message: 'Caracteres insuficientes'
            },
            pattern: {
                params: "^[A-Za-zÀ-ú0-9 ']+$",
                message: 'Caracter invalido'
            }
        }),
        //cidade

        self.cidade = ko.observable().extend({
            required: {
                params: true,
                message: 'campo obrigatorio'
            },
            minLength: {
                params: 3,
                message: 'Caracteres insuficientes'
            },
            pattern: {
                params: "^[A-Za-zÀ-ú0-9 ']+$",
                message: 'Caracter invalidos'
            }
        }),
        //estado

        self.estado = ko.observable().extend({
            required: {
                params: true,
                message: 'campo obrigatorio'
            },
            minLength: {
                params: 2,
                message: 'Caracteres insuficientes'
            },
            pattern: {
                params: "^[A-Za-zÀ-ú ']+$",
                message: 'Apenas letras'
            }
        })

    self.travaCep = ko.observable(true)
    self.travaEndereço = ko.observable(true)
    self.travaEstado = ko.observable(true)
    self.travaBairro = ko.observable(true)
    self.travaCidade = ko.observable(true)


    var Erros = ko.validation.group([self.firstName, self.lastName, self.ddd, self.numberFone, self.cep])

    self.testCep = function () {
        var cep = appViewModel.cep()

        if (Erros().length == 0) {

            api.getCep(cep).then((busca) => {

                console.log(busca)
                self.cidade(busca.localidade)
                self.estado(busca.uf)
                self.bairro(busca.bairro)
                self.endereço(busca.logradouro)

                if (self.cep() != "") {
                    self.travaCep(false)
                } else {
                    self.travaCep(true)
                } if (self.endereço() != "") {
                    self.travaEndereço(false)
                } else {
                    self.travaEndereço(true)
                } if (self.estado() != "") {
                    self.travaEstado(false)
                } else {
                    self.travaEstado(true)
                } if (self.cidade() != "") {
                    self.travaCidade(false)
                } else {
                    self.travaCidade(true)
                } if (self.bairro() != "") {
                    self.travaBairro(false)
                } else {
                    self.travaBairro(true)
                }
            })
        } else {
            Erros.showAllMessages()
        }
    }

    self.enviaFormulario = function () {

        self.Erros = ko.validation.group([self.firstName, self.lastName, self.numberFone, self.ddd, self.cep, self.endereço, self.nResidencia, self.bairro, self.cidade, self.estado])
        if (self.Erros().length == 0) {
            $('#botao').removeAttr('disabled')
            var objJson = {
                'firstName': self.firstName(),
                'lastName': self.lastName(),
                'phone': self.numberFone(),
                'cep': self.cep(),
                'address': self.endereço(),
                'number': self.nResidencia(),
                'complement': self.complemento(),
                'district': self.bairro(),
                'city': self.cidade(),
                'state': self.estado()
            }
            console.log(objJson)
        } else {
            $('#botao').attr('disabled', 'disabled')
        }
    }
}


const appViewModel = new AppViewModel()

// can be used in the navigation console
window.appViewModel = appViewModel

appViewModel.isValid = ko.computed(function () {
    return ko.validatedObservable(appViewModel).isValid();
})

// Activates knockout.js
ko.applyBindings(appViewModel)
