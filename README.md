# CADENA DE SUMINISTRO PARA COMPONENTES DE AUTOMOVIL EN ETHEREUM

# Caso de uso
Este proyecto es una cadena de suministro que registra las transacciones en Ethereum. En el ejemplo se aplica a una cadena de suministro de componentes de Automóvil.


# Diseño de la solución
El proyecto utiliza dos Smart Contracts:

* SupplyChain.sol - Registra las piezas fabricadas y la ruta de las mismas a lo largo de la cadena de suministro.

* CPC.sol - Es el token ERC20, (CPC) utilizado en las transacciones dentro de la cadena de suministro. 

Además utilizamos @openzeppelin/contracts/access/AccessControl.sol para definir los roles y permisos definidos dentro de la cadena de suministro. 

El proyecto dispone de una interface web simple que permite interactuar con los smart contracts con diferentes roles: Fabricante, Distribuidor o modo visualización (por defecto).


## SupplyChain.sol

En este smart contract gestionamos las transacciones en la cadena de suministro. Para participar en la cadena de suministro, el Administrador (owner del contrato) debe asignar un rol a las direcciones de los participantes. En nuestro proyecto definimos los siguientes roles:

* MANUFACTURER_ROLE: Puede fabricar, poner a la venta y enviar las piezas.

* DISTRIBUTOR_ROLE: Puede comprar, procesar, vender y enviar las piezas. 

* RETAILER_ROLE: Puede comprar y vender piezas.

* CONSUMER_ROLE: Puede Comprar piezas.

* DEFAULT_ADMIN_ROLE: Puede asignar roles a direcciones.

### Variables de estado:

 - **upc**: Identificador Universal Product Code de la pieza asignado por el fabricante.

 - **sku**: Identificador Stock Keeping Unit de la pieza asignado por el contrato.
	 
 - **owner**: Propietario del contrato. Será la dirección que tendrá el rol DEFAULR_ADMIN_ROLE y por tanto tendrá permitido asignar roles.
	 
 - **_CPCcontract**: Referencia al token CPC. Se usará para transferir tokens del comprador al vendedor.
	 	 
 - **items**: Mapa que relaciona el identificador UPC de una pieza con la estructura de información asociada - Items.

   **itemsHistory**: Mapa que relaciona el identificador UPC de una pieza con la estructura Txblocks, con la información de los bloques de la cadena que contienen las transacciones en las que cambia la propiedad de la pieza.

### Métodos:

 - **Constructor( *CPCtoken* )**: Inicializa la variable owner con la dirección desde la que se despliegue el contrato y la variable _CPCcontract con la dirección del parámetro de entrada *CPCtoken*.
	 
 - **addManufacturer(*address*)**: Asigna el rol MANUFACTURER_ROLE a la dirección del parámetro *address*. Únicamente la puede ejecutar el Administrador
	 
 - **addDistributor(*address*)**: Asigna el rol DISTRIBUTOR_ROLE a la dirección del parámetro *address*. Únicamente la puede ejecutar el Administrador
	 
 - **addRetailer(*address*)**: Asigna el rol RETAILER_ROLE a la dirección del parámetro *address*. Únicamente la puede ejecutar el Administrador
	 
 - **addConsumer(*address*)**: Asigna el rol CONSUMER_ROLE a la dirección del parámetro *address*. Únicamente la puede ejecutar el Administrador
	 
 - **renounceManufacturer( )**: Elimina el rol MANUFACTURER_ROLE de la dirección del *msg.sender*

 - **renounceDistributor( )**: Elimina el rol DISTRIBUTOR_ROLE de la dirección del *msg.sender*

  - **renounceRetailer( )**: Elimina el rol RETAILER_ROLE de la dirección del *msg.sender*

  - **renounceConsumer( )**: Elimina el rol CONSUMER_ROLE de la dirección del *msg.sender*

  - **_make_payable(*address*)**: Convierte la dirección del parámetro *address* en payable

  - **produceItemByManufacturer(uint _upc,string memory _productType, string memory _productNotes, uint _price)**. Crea una nueva pieza, requiere MANUFACTURER_ROLE

  - **sellItemByManufacturer(uint _upc, uint _price)**. Pone en venta una pieza por el fabricante, requiere MANUFACTURER_ROLE

  - **purchaseItemByDistributor(uint _upc)**. Compra de una pieza por un distribuidor, requiere DISTRIBUTOR_ROLE

  - **shippedItemByManufacturer(uint _upc)**. Pieza enviada por fabricante, requiere MANUFACTURER_ROLE

  - **receivedItemByDistributor(uint _upc)**. Recepcionado de pieza por un distribuidor, requiere DISTRIBUTOR_ROLE

  - **processedItemByDistributor(uint _upc)**. Procesado de la pieza por el distribuidor, requiere DISTRIBUTOR_ROLE

  - **packageItemByDistributor(uint _upc)**. Empaquetado de la pieza por el distribuidor, requiere DISTRIBUTOR_ROLE

  - **sellItemByDistributor(uint _upc, uint _price)**. Puesta en venta de la pieza por el distribuidor, requiere DISTRIBUTOR_ROLE

  - **purchaseItemByRetailer(uint _upc)**. Compra de la pieza por un almacén, requiere RETAILER_ROLE

  - **shippedItemByDistributor(uint _upc)**. Envío de la pieza por el distribuidor, requiere DISTRIBUTOR_ROLE

  - **receivedItemByRetailer(uint _upc)**. Pieza recibida por almacén, requiere RETAILER_ROLE

  - **sellItemByRetailer(uint _upc, uint _price)**. Puesta en venta de la pieza por el almacén, requiere RETAILER_ROLE

  - **purchaseItemByConsumer(uint _upc)**. Compra de la pieza por el cliente final, requiere CONSUMER_ROLE


### Modificadores:

 - **onlyOwner()**: Verifica que dirección desde la que se llama al método sea _owner

 - **verifyCaller(*address*)**: Verifica que la dirección desde la que se llama el método sea *address*

 - **onlyManufacturer()**: Verifica que la dirección desde la que se llama el método tiene el rol adecuado

 - **onlyDistributor()**: Verifica que la dirección desde la que se llama el método tiene el rol adecuado

 - **onlyRetailer()**: Verifica que la dirección desde la que se llama el método tiene el rol adecuado

 - **onlyConsumer()**: Verifica que la dirección desde la que se llama el método tiene el rol adecuado

 - **onlyAdmin()**: Verifica que la dirección desde la que se llama el método tiene el rol adecuado

 - **paidEnough(uint _price)**: Verifica si el dinero pagado es suficiente para pagar el precio del producto

 - **checkValue(uint _upc, address payable addressToFund)**: Verifica si el dinero pagado es suficiente y devuelve el exceso a la dirección indicada en el parámetro

 - **producedByManufacturer(uint _upc)**: Verifica que el estado actual de la pieza es adecuado

 - **forSaleByManufacturer(uint _upc)**: Verifica que el estado actual de la pieza es adecuado

 - **purchasedByDistributor(uint _upc)**: Verifica que el estado actual de la pieza es adecuado

 - **shippedByManufacturer(uint _upc)**: Verifica que el estado actual de la pieza es adecuado

 - **receivedByDistributor(uint _upc)**: Verifica que el estado actual de la pieza es adecuado

 - **processByDistributor(uint _upc)**: Verifica que el estado actual de la pieza es adecuado

 - **packagedByDistributor(uint _upc)**: Verifica que el estado actual de la pieza es adecuado

 - **forSaleByDistributor(uint _upc)**: Verifica que el estado actual de la pieza es adecuado

 - **shippedByDistributor(uint _upc)**: Verifica que el estado actual de la pieza es adecuado

 - **purchasedByRetailer(uint _upc)**: Verifica que el estado actual de la pieza es adecuado

 - **receivedByRetailer(uint _upc)**: Verifica que el estado actual de la pieza es adecuado

 - **forSaleByRetailer(uint _upc)**: Verifica que el estado actual de la pieza es adecuado
 
 - **purchasedByConsumer(uint _upc)**: Verifica que el estado actual de la pieza es adecuado


### Estructuras:

La información de la pieza se almacena internamente usando la siguiente estructura:

 - **Item**
	 - **sku**:Stock Keeping Unit (SKU), generado por el contrato
	 - **upc**: Universal Product Code (UPC), generado por el fabricante
	 - **ownerID**: Dirección Ethereum del propietario actual, según la pieza se desplaza por la cadena de suministro
	 - **originManufacturerID**: Dirección Ethereum del Fabricante // ADDED PAYABLE
	 - **productID**: Product Hash ID: Hash id único de la pieza
	 - **productType**: Identificación del tipo de pieza
	 - **productNotes**: Información adicional opcional de la pieza registrada por el fabricante
	 - **productDate**: Fecha de fabricación de la pieza
	 - **productPrice**: Precio actual de la pieza 
	 - **itemState**: Estado de la pieza - definido en enum State:
						ProduceByManufacturer:0, ForSaleByManufacturer:1, PurchasedByDistributor:2,
						ShippedByManufacturer:3, ReceivedByDistributor:4, ProcessedByDistributor:5,
						PackageByDistributor:6, ForSaleByDistributor:7, PurchasedByRetailer:8,
						ShippedByDistributor:9, ReceivedByRetailer:10, ForSaleByRetailer:11, 
						PurchasedByConsumer:12
	 - **distributorID**: Dirección Ethereum del distribuidor
	 - **retailerID**: Dirección Ethereum del almacén
	 - **consumerID**: Dirección Ethereum del cliente

La información de los bloques en los que cambia el propietario de la pieza se almacena en la estructura:

  - **Txblock**
	 - **FTD**: Bloque de fabricante a distribuidor
     - **DTR**: Bloque de distribuidor a almacén
     - **RTC**: Bloque de almacén a cliente


### Eventos:

 - **ProduceByManufacturer(uint indexed upc,address indexed account)**:  Se utiliza para informar y poder consultar el histórico en la Blockchain por pieza, fabricante

  -**ForSaleByManufacturer(uint indexed upc,address indexed account)**:  Se utiliza para informar y poder consultar el histórico en la Blockchain por pieza, fabricante

 - **PurchasedByDistributor(uint indexed upc,address indexed account**:  Se utiliza para informar y poder consultar el histórico en la Blockchain por pieza, distribuidor

 - **ShippedByManufacturer(uint indexed upc,address indexed account)**:  Se utiliza para informar y poder consultar el histórico en la Blockchain por pieza, fabricante

 - **ReceivedByDistributor(uint indexed upc,address indexed account)**:  Se utiliza para informar y poder consultar el histórico en la Blockchain por pieza, distribuidor

 - **ProcessedByDistributor(uint indexed upc,address indexed account)**: Se utiliza para informar y poder consultar el histórico en la Blockchain por pieza, distribuidor

 - **PackagedByDistributor(uint indexed upc,address indexed account)**:  Se utiliza para informar y poder consultar el histórico en la Blockchain por pieza, distribuidor

 - **ForSaleByDistributor(uint indexed upc,address indexed account)**:   Se utiliza para informar y poder consultar el histórico en la Blockchain por pieza, distribuidor

 - **PurchasedByRetailer(uint indexed upc,address indexed account)**:    Se utiliza para informar y poder consultar el histórico en la Blockchain por pieza, almacén

 - **ShippedByDistributor(uint indexed upc,address indexed account)**:   Se utiliza para informar y poder consultar el histórico en la Blockchain por pieza, almacén

 - **ReceivedByRetailer(uint indexed upc,address indexed account)**:     Se utiliza para informar y poder consultar el histórico en la Blockchain por pieza, almacén

 - **ForSaleByRetailer(uint indexed upc,address indexed account)**:      Se utiliza para informar y poder consultar el histórico en la Blockchain por pieza, almacén

 - **PurchasedByConsumer(uint indexed upc,address indexed account)**:    Se utiliza para informar y poder consultar el histórico en la Blockchain por pieza, cliente

## CPC.sol

Se utilizará el modelo de token ERC20 de OpenZeppelin para hacer este smart contract, sin hacer ninguna modificación.

En el momento del despliegue del contrato se asignarán 21M de tokens CPC para la dirección desde la que se despliegue el contrato.

# Compilación y despliegue
Para compilar y desplegar los contratos se usará el editor Remix. Los pasos para el despliegue son los siguientes:

 1. Desplegar CPC.sol y guardar la dirección del contrato.
 2. Desplegar SupplyChain.sol, aportando la dirección del contrato desplegado en el primer paso.
 3. Definir direcciones y asignar roles por el administrador. 

La versión actual de los contratos desplegados es:
- [SupplyChain.sol](https://testnet.bscscan.com/address/0x4B49C99d0Bd4E23B62Eb2230eacB58fE64bcbA69)
- [CPC.sol](https://testnet.bscscan.com/address/0xd6bb7ff854873a96efA10F255219b3Fa47D6051d)

# DAPP

La aplicación está desarrollada utilizando la librería web3 y javascript y nos permite probar el funcionamiento de los Smart Contracts y la cadena de suministro.

## *Index.html*

En la pantalla de inicio, podemos visualizar las piezas fabricadas por cualquier fabricante. Las piezas fabricadas se buscan en el histórico de eventos (evento produceByManufacturer), mediante el método getPastEvents, a partir del bloque en el que se despliega el contrato. Debido a limitaciones en BSC, no podemos consultar todo el rango de bloques (from o to latest), tenemos que consultar máximo 5000 bloques por consulta, por tanto requiere cierto tiempo para recuperar todas las piezas del histórico.
Mediante doble click en la línea de la tabla correspondiente a una pieza, podemos desplegar la información de detalle de la pieza.
En el menú superior, *Cadena de suministro*, podemos seleccionar la pantalla de aplicación correspondiente a los diferentes roles (fabricante, distribuidor, almacén y cliente).

![index.html](/readmeimg/index.png "Pantalla inicial")

## *manufacturer.html*

En la pantalla de fabricante, podemos crear nuevas piezas, ponerlas en venta y enviarlas al distribuidor. 

![manufacturer.html](/readmeimg/manufacturer.png "Fabricante")


## *distributor.html*

En la pantalla de distribuidor, podemos comprar, recepcionar, procesar, poner en venta y enviar piezas al almacén. 

![distributor.html](/readmeimg/distributor.png "Distribuidor")


## *retailer.html*

En la pantalla de almacén, podemos comprar, recepcionar y poner en venta piezas adquiridas a un distribuidor. 

![distributor.html](/readmeimg/retailer.png "Almacén")


## *consumer.html*

En la pantalla de cliente, podemos comprar las piezas puestas en venta por los almacenes. 

![distributor.html](/readmeimg/consumer.png "Cliente")

# Mejoras planeadas

 - Modificar SupplyChain.sol para permitir definir por el fabricante una ruta específica para cada pieza.

