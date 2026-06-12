import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Filosofía en positivo",
  description:
    "Qué significa una peluquería canina en positivo: manejo sin estrés, productos veganos y respeto por cada perro.",
};

export default function FilosofiaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl">
        Peluquería <em className="text-coral">en positivo</em>
      </h1>
      <p className="mt-4 text-lg text-tinta-suave">
        No es un eslogan: es la forma de trabajar de esta casa. Aquí está el alma de la
        Perruquería, contada sin rodeos.
      </p>

      <div className="mt-8 overflow-hidden rounded-3xl shadow-lg">
        <Image
          src="/img/filosofia.jpg"
          alt="Caricia tranquila a un perro relajado (imagen ilustrativa)"
          width={1831}
          height={859}
          className="h-64 w-full object-cover sm:h-80"
        />
      </div>
      <p className="mt-2 text-right text-xs text-tinta-suave">Imagen ilustrativa</p>

      <section className="mt-10 space-y-8">
        <div>
          <h2 className="text-2xl">Manejo sin miedo ni estrés</h2>
          <p className="mt-3 text-tinta-suave">
            Un perro no entiende qué es una peluquería: solo siente lo que pasa allí. Por eso
            cada sesión empieza despacio, con olfateo, premios y voz tranquila. Nunca se
            sujeta a la fuerza ni se «aguanta» a un perro asustado para terminar antes. Si
            hace falta parar, se para. Si hace falta repartir el trabajo en dos visitas, se
            reparte.
          </p>
        </div>

        <div>
          <h2 className="text-2xl">¿Y si mi perro tiene miedo?</h2>
          <p className="mt-3 text-tinta-suave">
            Entonces este es su sitio. Los perros con malas experiencias necesitan reescribir
            lo que significa la peluquería, y eso se consigue con psicología, paciencia y
            sesiones de habituación a su medida. No es magia ni es rápido, pero funciona: el
            día que tu perro entra moviendo el rabo, lo entiendes todo.
          </p>
        </div>

        <div>
          <h2 className="text-2xl">Productos específicos veganos 🌱</h2>
          <p className="mt-3 text-tinta-suave">
            Usamos champús y tratamientos veganos, elegidos por su suavidad con la piel y su
            respeto por los animales y el planeta. Cada manto y cada piel recibe su producto:
            calmante para pieles sensibles, específico para deslanados, suave para cachorros.
          </p>
        </div>

        <div className="rounded-3xl bg-cielo-claro p-7">
          <h2 className="text-2xl">Lo que esto significa para ti</h2>
          <ul className="lista-huellas mt-4 space-y-3 text-sm">
            <li>Tu perro no «sobrevive» a la peluquería: la disfruta (o aprende a hacerlo).</li>
            <li>Te contamos siempre cómo ha ido la sesión, sin maquillar nada.</li>
            <li>Si un servicio no le conviene, te lo decimos aunque perdamos la venta.</li>
            <li>El acabado importa, pero su bienestar importa más.</li>
          </ul>
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/calculadora" className="rounded-full bg-coral px-6 py-3 font-bold text-white hover:bg-coral-oscuro">
          Calcula tu tarifa
        </Link>
        <Link href="/reservas" className="rounded-full border-2 border-tinta/15 bg-white px-6 py-3 font-bold hover:border-coral hover:text-coral">
          Reserva cita
        </Link>
      </div>
    </div>
  );
}
