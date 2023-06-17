import React from 'react';
import axios from 'axios'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const CompPoliticas = () => {



    return (
        <div className="m-3 row text-justify justify-content-center">
            <div className="m-3 col-10 text-justify">
                <h1 className="display-1">
                    Politicas de privacidad
                </h1>
                <h3>CONTRATO DE CONFIDENCIALIDAD Y ACCESO A DATOS POR CUENTA DE TERCERAS PERSONAS</h3>

                <p className="text-left">
                    <h3>1. OBJETO</h3>
                    En cumplimiento del nuevo Reglamento General de Protección de Datos 2016/679, de 27 de abril de 2016, y de la nueva Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales, cada una de las Partes y, en su caso, sus representantes, quedan informadas de que sus datos de carácter personal serán tratados por la otra parte con la finalidad de permitir el desarrollo, cumplimiento y control de la relación contractual de voluntariado concertada, siendo la base del tratamiento el cumplimiento de dicha relación. La identificación de las Partes es un requisito necesario para la formalización del presente Contrato, por lo que no podrá llevarse a cabo el mismo sin que concurra el citado requisito.
                </p>
                <p className="text-left">
                    <h3>2. DURACIÓN</h3>

                    El presente acuerdo tiene una duración de 1 AÑO, siendo renovado automáticamente salvo decisión en contra por alguna de las partes.

                    Los datos serán conservados durante todo el tiempo en que la relación contractual subsista y aún después, hasta que prescriban las eventuales responsabilidades derivadas de ella.

                    Una vez finalice el presente contrato, la contratista debe devolver a la responsable o trasmitir a otra contratista que designe la contratante los datos personales, y suprimir cualquier copia que esté en su poder. No obstante, podrá mantener bloqueados los datos para atender posibles responsabilidades administrativas o jurisdiccionales.
                </p>
                <p className="text-left">
                    <h3>3. OBLIGACIONES DE LA CONTRATISTA</h3>

                    La persona voluntaria se obliga a:
                    <ul>
                        <li>Utilizar los datos personales objeto de tratamiento, o los que recoja para su inclusión, sólo para la finalidad objeto de este encargo. En ningún caso podrá utilizar los datos para fines propios.
                        </li>

                        <li>Tratar los datos de acuerdo con las instrucciones de la contratante.
                        </li>

                        <li>No comunicar los datos a terceras personas, salvo que cuente con la autorización expresa de la contratante, en los supuestos legalmente admisibles.
                        </li>

                        <li>Mantener el deber de secreto respecto a los datos de carácter personal a los que haya tenido acceso en virtud del presente encargo, incluso después de que finalice el contrato.
                        </li>

                        <li>Garantizar que las personas autorizadas para tratar datos personales se comprometan, de forma expresa y por escrito, a respetar la confidencialidad y a cumplir las medidas de seguridad correspondientes, de las que hay que informarles convenientemente.
                        </li>

                        <li>Mantener a disposición de la Fundación Ana Bella la documentación acreditativa del cumplimiento de la obligación establecida en el apartado anterior.
                        </li>

                        <li>Garantizar la formación necesaria en materia de protección de datos personales de las personas autorizadas para tratar datos personales.
                        </li>

                        <li>Cuando las personas afectadas ejerzan los derechos de acceso, rectificación, supresión y oposición, limitación del tratamiento y portabilidad de datos ante la gestoría, ésta debe comunicarlo por correo electrónico a la dirección que indique la contratante. La comunicación debe hacerse de forma inmediata y en ningún caso más allá del día laborable siguiente al de la recepción de la solicitud, juntamente, en su caso, con otras informaciones que puedan ser relevantes para resolver la solicitud.
                        </li>

                        <li>Notificación de violaciones de la seguridad de los datos.
                        </li>
                        <li>
                        </li>


                    </ul>

                    La persona voluntaria notificará a La Fundación Ana Bella el tratamiento, sin dilación indebida y a través de la dirección de correo electrónico que le indique la responsable, las violaciones de la seguridad de los datos personales a su cargo de las que tenga conocimiento, juntamente con toda la información relevante para la documentación y comunicación de la incidencia.
                    LA PERSONA VOLUNTARIA, a petición de la Fundación Ana Bella, comunicará en el menor tiempo posible esas violaciones de la seguridad de los datos a las personas interesadas, cuando sea probable que la violación suponga un alto riesgo para los derechos y las libertades de las personas físicas.

                </p>
                <p>

                    La comunicación debe realizarse en un lenguaje claro y sencillo y deberá incluir los elementos que en cada caso señale la contratante, como mínimo:

                    <ol>
                        <li>La naturaleza de la violación de datos.
                        </li>

                        <li>Datos del punto de contacto de la persona responsable o encargada donde se pueda obtener más información.
                        </li>

                        <li>Describir las posibles consecuencias de la violación de la seguridad de los datos personales.
                        </li>

                        <li>Describir las medidas adoptadas o propuestas por la responsable del tratamiento para poner remedio a la violación de la seguridad de los datos personales, incluyendo, si procede, las medidas adoptadas para mitigar los posibles efectos negativos.
                        </li>

                        <li>Poner a disposición de la contratante toda la información necesaria para demostrar el cumplimiento de sus obligaciones, así como para la realización de las auditorías o las inspecciones que realicen la responsable u otro/a auditor/a autorizada por ella.
                        </li>
                        <li>Implantar las medidas de seguridad técnicas y organizativas necesarias para garantizar la confidencialidad, integridad, disponibilidad y resiliencia permanentes de los sistemas y servicios de tratamiento.
                        </li>

                    </ol>


                    Destino de los datos.
                    Devolver a la contratante los datos de carácter personal y, si procede, los soportes donde consten, una vez cumplida la prestación.

                    La devolución debe comportar el borrado total de los datos existentes en los equipos informáticos utilizados por la persona encargada.

                    No obstante, la contratista puede conservar una copia, con los datos debidamente bloqueados, mientras puedan derivarse responsabilidades de la ejecución de la prestación.
                </p>
                <p>
                    <h3> 4. Obligaciones de la Contratante:</h3>

                    Corresponde a la contratante:
                    a	Entregar a la contratista los datos necesarios para que pueda prestar el servicio.
                    b	Velar, de forma previa y durante todo el tratamiento, por el cumplimiento del RGPD por parte de la encargada.
                    c	Supervisar el tratamiento.

                </p>
                <p>

                </p>
            </div>

        </div>
    )
}


export default CompPoliticas