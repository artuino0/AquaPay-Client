import { Page, Text, View, Image, Document, StyleSheet } from "@react-pdf/renderer";
import logo from "../../../assets/logo-c.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 8,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    marginVertical: 2,
    paddingVertical: 5,
  },
  container: {
    backgroundColor: "#CFCFCF",
    marginBottom: 0,
    padding: 2,
  },
  text: {
    padding: 2,
  },
});

// Create Document Component
const MyBill = () => (
  <Document>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
      <Page size="LETTER" style={styles.page} key={number} orientation="landscape">
        <View style={{ width: "50%" }}>
          <View style={styles.header}>
            <View style={{ width: "50%" }}>
              <Image source={logo} style={{ width: "100px" }} />
            </View>
            <View style={{ width: "50%", fontSize: "9px", textAlign: "right" }}>
              <Text style={{ fontSize: "12px", fontWeight: "bold", fontStyle: "italic" }}>GRUPO AQUAPAY, S.A. DE C.V.</Text>
              <Text>5 DE MAYO No. 126 2-C</Text>
              <Text>ZONA CENTRO, C.P. 37800</Text>
              <Text>LEON, GUANAJUATO</Text>
              <Text>TEL. 01 (000) 733-78-73</Text>
              <Text>Celular. (000) 599-44-85</Text>
            </View>
          </View>
          <View style={styles.header}>
            <View style={{ width: "60%", fontSize: "9px" }}>
              <Text style={{ fontSize: "10px", fontWeight: "bold", fontStyle: "italic", marginBottom: "4px" }}>RECIBO AGUA POTABLE</Text>
              <Text>Jose Arturo Muñoz Castorena</Text>
              <Text>Bugambilias No. {number}</Text>
              <Text>Fracc. Villas de las arboledas, Irapuato Gto.</Text>
              <Text>Lote No. 203</Text>
              <Text>Medidor No. 14-10-63327</Text>
            </View>
            <View style={{ fontSize: "9px", textAlign: "center", width: "40%", fontWeight: "bold", border: "2pt solid black" }}>
              <Text style={styles.container}>Contrato</Text>
              <Text style={styles.text}>231</Text>
              <Text style={styles.container}>Total a pagar</Text>
              <Text style={styles.text}>$350.96</Text>
              <Text style={styles.container}>Fecha limite de pago</Text>
              <Text style={styles.text}>15 de abril de 2023</Text>
            </View>
          </View>

          <View style={{ fontSize: "9px", width: "100%", fontWeight: "bold", border: "2pt solid black", marginBottom: "15px", marginTop: "5px" }}>
            <View style={{ ...styles.container, flexDirection: "row" }}>
              <Text style={{ width: "75%" }}>Lectura anterior</Text>
              <View style={{ width: "25%", flexDirection: "row", justifyContent: "space-between" }}>
                <Text></Text>
                <Text>117</Text>
              </View>
            </View>
            <View style={{ ...styles.text, flexDirection: "row" }}>
              <Text style={{ width: "75%" }}>Lectura actual</Text>
              <View style={{ width: "25%", flexDirection: "row", justifyContent: "space-between" }}>
                <Text></Text>
                <Text>119</Text>
              </View>
            </View>
            <View style={{ ...styles.container, flexDirection: "row" }}>
              <Text style={{ width: "75%" }}>Consumo</Text>
              <View style={{ width: "25%", flexDirection: "row", justifyContent: "space-between" }}>
                <Text></Text>
                <Text>2</Text>
              </View>
            </View>
          </View>

          <View style={{ fontSize: "9px", width: "100%", fontWeight: "bold", border: "2pt solid black" }}>
            <View style={{ ...styles.container, fontSize: "10px" }}>
              <Text style={{ width: "75%", fontWeight: "bold" }}>Concepto de cobro</Text>
            </View>
            <View style={{ ...styles.text, flexDirection: "row" }}>
              <Text style={{ width: "75%" }}>Adeudo Anterior</Text>
              <View style={{ width: "25%", flexDirection: "row", justifyContent: "space-between" }}>
                <Text>$</Text>
                <Text>370.01</Text>
              </View>
            </View>
            <View style={{ ...styles.container, flexDirection: "row" }}>
              <Text style={{ width: "75%" }}>Su pago</Text>
              <View style={{ width: "25%", flexDirection: "row", justifyContent: "space-between" }}>
                <Text>$</Text>
                <Text>200.00</Text>
              </View>
            </View>
            <View style={{ ...styles.text, flexDirection: "row" }}>
              <Text style={{ width: "75%" }}>Importe de consumo</Text>
              <View style={{ width: "25%", flexDirection: "row", justifyContent: "space-between" }}>
                <Text>$</Text>
                <Text>38.31</Text>
              </View>
            </View>
            <View style={{ ...styles.container, flexDirection: "row" }}>
              <Text style={{ width: "75%" }}>Cuota base</Text>
              <View style={{ width: "25%", flexDirection: "row", justifyContent: "space-between" }}>
                <Text>$</Text>
                <Text>137.48</Text>
              </View>
            </View>
            <View style={{ ...styles.text, flexDirection: "row" }}>
              <Text style={{ width: "75%" }}>Recargos</Text>
              <View style={{ width: "25%", flexDirection: "row", justifyContent: "space-between" }}>
                <Text>$</Text>
                <Text>5.16</Text>
              </View>
            </View>
            <View style={{ ...styles.container, flexDirection: "row" }}>
              <Text style={{ width: "75%" }}>Descuento</Text>
              <View style={{ width: "25%", flexDirection: "row", justifyContent: "space-between" }}>
                <Text>$</Text>
                <Text> - </Text>
              </View>
            </View>
            <View style={{ ...styles.text, flexDirection: "row" }}>
              <Text style={{ width: "75%", textAlign: "right", paddingRight: "5px" }}>Total a pagar</Text>
              <View style={{ width: "25%", flexDirection: "row", justifyContent: "space-between" }}>
                <Text></Text>
                <Text>$350.96</Text>
              </View>
            </View>
          </View>

          <View style={{ fontSize: "10px", border: "2pt solid black", marginTop: "15px" }}>
            <View>
              <Text style={{ textAlign: "center", ...styles.container }}>Cuentas bancarias</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", textAlign: "center" }}>
              <View style={{ textAlign: "center", width: "45%", paddingVertical: "15px" }}>
                <Text style={{ width: "100%" }}>Banco Santander</Text>
                <Text style={{ width: "100%" }}>6550 0000 0000 0000</Text>
              </View>
              <View style={{ textAlign: "center", width: "45%", paddingVertical: "15px" }}>
                <Text style={{ width: "100%" }}>Banco Banamex</Text>
                <Text style={{ width: "100%" }}>6550 0000 0000 0000</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={{ textAlign: "center", fontSize: "9px", paddingVertical: "15px", paddingHorizontal: "15px" }}>
              Queremos recordarle que su pago puntual del recibo de agua es fundamental para poder continuar brindándole un servicio de calidad. Su contribución nos permite mantener y mejorar nuestro sistema de suministro para satisfacer sus
              necesidades.
            </Text>
          </View>
        </View>
      </Page>
    ))}
  </Document>
);

export default MyBill;
