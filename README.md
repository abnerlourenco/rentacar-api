

## Cadastro de carro
>**RF**
>- Deve ser possível cadastrar um novo carro

>**RN**
>- Não pode ser cadastrar um carro com a placa já existente.
>- O carro deve ser cadastrado como disponível por padrão.
>- Não deve ser possível cadastrar um carro, caso usuário não for admin.

## Alterar cadastro de carro
>**RF**
>- Deve ser possível alterar o carro cadastrado;

>**RN**
>- Não deve ser possível alterar a placa de um carro já cadastrado.

## Listagem de carros
>**RF**
>- Deve ser possível listar todos os carros disponíveis.
>- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
>- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
>- Deve ser possível listar todos os carros disponíveis pelo nome do carro.


<!-- >- Deve ser possível listar todos os carros disponíveis em um período. -->

>**RN**
>- Não deve ser necessário estar logado para listar os carros.

## Cadastro de Especificação no carro
>**RF**
>- Deve ser possível cadastrar uma especificação para um carro.

>**RN**
>- Não deve ser possível cadastrar uma especificação para um carro não cadastrado
>- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
>- Não deve ser possível cadastrar uma especificação, caso usuário não for admin.

## Cadastro de Imagens do Carro
>**RF**
>- Deve ser possível cadastrar a imagem do carro.
>- Deve ser possível listar todos os carros.

>**RNF**
>- utilizar o multer para upload dos arquivos

>**RN**
>- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
>- Não deve ser possível cadastrar uma imagem, caso usuário não for admin.


## Aluguel de carro
>**RF**
>- Deve ser possível cadastrar o aluguel.

>**RN**
>- O Aluguel deve ter no mínimo 24 hora de duração.
>- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
>- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
>- O Usuário deve estar logado na aplicação.
>- Ao Realizar um aluguel, o status do carro deverá ser alterado para indisponível.


## Devolução de carro

>**RF**
>- Deve ser possível realizar a devolução de um carro

>**RN**
>- Se o Carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa
>- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
>- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
>- Ao realizar a devolução, deverá ser calculado o total do aluguel.
>- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado
multa proporcional aos dias de atraso.
>- Caso haja multa, deverá ser somado ao total do aluguel.
>- O Usuário deve estar logado na aplicação.


<br/>
<br/>

**Obs.:** 
>- RF - Requisitos funcionais (funcionalidades vinculadas)
>- RNF - Requisitos não funcionais (funcionalidades não vinculada)
>- RN - Regra de negócio (O se espera das funcionalidades vinculada)