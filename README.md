

## Cadastro de carro
>**RF**
>- Deve ser possível cadastrar um novo carro
>- Deve ser possível listar todas as categorias.

>**RN**
>- Não pode ser cadastrar um carro com a placa já existente.
>- Não deve ser possível alterar a placa de um carro já cadastrado.
>- O carro deve ser cadastrado como disponível por padrão.
>- Não deve ser possível cadastrar um carro, caso usuário não for admin.

## Listagem de carros
>**RF**
>- Deve ser possível listar todos os carros disponíveis.
>- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
>- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
>- Deve ser possível listar todos os carros disponíveis pelo nome do carro.
>- Deve ser possível listar todos os carros disponíveis em um período.

>**RN**
>- Não deve ser necessário estar logado para listar os carros.

## Cadastro de Especificação no carro
>**RF**
>- Deve ser possível cadastrar uma especificação para um carro.
>- Deve ser possível listar todos os carros.
>- Deve ser possível listar todas as especificações.

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

<br/>
<br/>

**Obs.:** 
>- RF - Requisitos funcionais (funcionalidades vinculadas)
>- RNF - Requisitos não funcionais (funcionalidades não vinculada)
>- RN - Regra de negócio (O se espera das funcionalidades vinculada)