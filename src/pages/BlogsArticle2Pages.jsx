import { Container, Row, Col, Image } from "react-bootstrap";
import HeaderComponents from "../components/HeaderComponents";
import FooterComponent from "../components/FooterComponent";

export default function HazañaTorta() {
  return (
    <>
    <HeaderComponents/>

        <section>
            <Container>
            <Row>
                <Col xs={12}>
                <h2>El triunfo de Ricardo Morales en París</h2>
                </Col>
            </Row>

            <Row>
                <Col xs={12} lg={8} className="order-1">
                <p>
                    Ricardo Morales, un talentoso pastelero de Viña del Mar, logró
                    un hito al llevarse el máximo galardón en el prestigioso
                    Concurso Mundial de Repostería celebrado en París.<br />
                    Su creación, la innovadora "Torta Cuadrada de Frutas", destacó
                    por la combinación perfecta de bizcocho de vainilla, frutas
                    frescas y crema chantilly, ofreciendo un equilibrio de sabores
                    que sorprendió al jurado.<br />
                    El pastelero dedicó su victoria a la inspiración de los sabores
                    costeros de su ciudad natal, transmitiendo en cada capa la
                    frescura y autenticidad de Viña del Mar.<br /><br />
                    La preparación de la torta fue meticulosa. Cada ingrediente fue
                    seleccionado con cuidado, desde las frutas más frescas hasta la
                    crema chantilly batida a punto exacto.<br />
                    La presentación fue un elemento clave: la forma cuadrada
                    permitió un diseño innovador que resaltaba los colores y
                    texturas de cada fruta, creando un efecto visual que cautivó a
                    todos los presentes.<br />
                    El jurado destacó no solo la técnica impecable, sino también la
                    creatividad de Morales al combinar elementos tradicionales con
                    un enfoque moderno y elegante.<br /><br />
                    La victoria en París consolidó a Ricardo Morales como uno de los
                    referentes de la repostería chilena a nivel internacional.<br />
                    Su torta demostró que la innovación puede coexistir con la
                    tradición, logrando un resultado que es tanto estéticamente
                    impresionante como delicioso al paladar.<br />
                    Este logro histórico inspira a otros pasteleros a explorar
                    nuevas formas de combinar sabores y técnicas, reafirmando que la
                    pasión y el detalle son la clave del éxito en la repostería
                    profesional.<br />
                </p>
                </Col>

                <Col xs={12} lg={4} className="order-2">
                <figure>
                    <Image
                    src="images/pasteles/TC002.png"
                    alt="Torta cuadrada de frutas"
                    fluid
                    rounded
                    className="mx-auto w-100"
                    />
                </figure>
                </Col>
            </Row>

            <Row>
                <Col>
                <p>
                    La "Torta Cuadrada de Frutas" no solo sorprendió por su sabor,
                    sino también por el cuidado y la técnica aplicada en cada etapa
                    de su creación.<br />
                    El bizcocho de vainilla fue horneado cuidadosamente para obtener
                    una textura ligera pero firme, capaz de soportar el peso de las
                    frutas y la crema sin perder suavidad.<br />
                    La selección de frutas fue otro factor determinante: Morales
                    eligió ingredientes frescos, de temporada y con colores
                    vibrantes, buscando un equilibrio perfecto entre dulzura y
                    acidez que resaltara cada bocado.<br /><br />
                    El montaje de la torta requirió precisión y paciencia. Cada capa
                    de crema chantilly fue aplicada uniformemente, y las frutas
                    colocadas estratégicamente para lograr una armonía visual y de
                    sabores.<br />
                    El formato cuadrado permitió jugar con líneas y simetrías,
                    generando un diseño moderno que resaltaba en comparación con los
                    tradicionales pasteles redondos.<br />
                    La decoración final incluyó detalles delicados, como frutas
                    pequeñas y toques de glaseado, que mostraban la habilidad
                    artística y la sensibilidad estética de Morales.<br /><br />
                    El reconocimiento internacional no solo premió la técnica, sino
                    también la creatividad y la pasión que Ricardo Morales imprimió
                    en cada etapa de la torta.<br />
                    Su logro representa un ejemplo de cómo la dedicación, la
                    innovación y el amor por la repostería pueden trascender
                    fronteras y dejar una marca en concursos de prestigio
                    mundial.<br />
                    La "Torta Cuadrada de Frutas" se convirtió en un símbolo del
                    talento chileno, uniendo tradición, frescura y creatividad en
                    una obra que seguirá inspirando a pasteleros y amantes de los
                    postres por años.<br />
                </p>
                </Col>
            </Row>
            </Container>
        </section>
        <FooterComponent/>
    </>
  );
}
