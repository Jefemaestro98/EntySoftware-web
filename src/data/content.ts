export const nav = {
  links: [
    { label: 'Quiénes somos', href: '#quienes' },
    { label: 'Qué hacemos', href: '#que' },
    { label: 'EntyPOS', href: '#entypos' },
    { label: 'Para qué', href: '#para' },
  ],
  cta: { label: 'Hablemos', href: '#contacto' },
}

export const hero = {
  tag: 'Software hecho en Colombia',
  titleLines: ['Creamos software', 'que hace crecer', 'tu negocio.'],
  text: 'Somos EntySoftware, un equipo dedicado a la creación de software: aplicaciones web, tiendas en línea y soluciones a la medida. Nuestro primer proyecto es EntyPOS, un sistema de punto de venta para restaurantes y negocios de comida.',
  primary: { label: 'Conoce EntyPOS', href: '#entypos' },
  secondary: { label: 'Quiénes somos', href: '#quienes' },
}

export const posDemo = {
  mesa: 'Mesa 4 · Pedido',
  estado: 'Día abierto',
  items: [
    { nombre: 'Hamburguesa doble', cant: 2 },
    { nombre: 'Papas grandes + adición queso', cant: 1 },
    { nombre: 'Gaseosa 400 ml', cant: 3 },
  ],
  chips: ['Mesas', 'Cocina', 'Caja', 'Insumos'],
  total: '[TOTAL]',
  accion: 'Enviar a cocina',
}

export const about = {
  number: 1,
  label: 'QUIÉNES SOMOS',
  title: 'Un equipo pequeño, cercano y técnico.',
  paragraphs: [
    'EntySoftware es una marca de desarrollo de software del Valle del Cauca, Colombia. Nacimos como un equipo de hermanos: uno construye las pantallas y la experiencia de uso; el otro, el servidor, la base de datos y la seguridad. Juntos cubrimos el producto de punta a punta.',
    'Conocemos de cerca el día a día de un negocio de comidas: la hora pico, el pedido que se pierde, la caja que no cuadra al cierre. Por eso construimos herramientas que se entienden desde el primer uso y que funcionan en el celular, la tablet o el computador que ya tienes.',
  ],
  stack: [
    { area: 'Frontend', tech: 'React · TypeScript · Tailwind · PWA' },
    { area: 'Backend', tech: 'Java · Spring Boot · MySQL · JWT' },
  ],
}

export const marquee = ['Punto de venta', 'Tiendas en línea', 'Software a la medida', 'Hecho en Colombia']

export const services = {
  number: 2,
  label: 'QUÉ HACEMOS',
  title: 'Tres formas de poner la tecnología a trabajar para ti.',
  items: [
    {
      title: 'Sistemas de punto de venta',
      text: 'Como EntyPOS, nuestro primer proyecto: toma de pedidos, mesas, cocina, caja y cierre del día para restaurantes y comidas rápidas.',
      href: '#entypos',
    },
    {
      title: 'Tiendas en línea',
      text: 'Ecommerce para que tus clientes vean tu catálogo y te compren desde cualquier lugar, a cualquier hora.',
      href: '#contacto',
    },
    {
      title: 'Software a la medida',
      text: 'Si tu proceso no cabe en una herramienta genérica, lo analizamos contigo y construimos la solución que tu negocio necesita.',
      href: '#contacto',
    },
  ],
}

export const pos = {
  number: 3,
  label: 'NUESTRO PRIMER PROYECTO',
  title: 'EntyPOS: todo tu restaurante, en una sola pantalla.',
  intro:
    'Una aplicación web instalable (PWA) que funciona en celular, tablet y computador. Pensada para negocios de comida con uno o dos locales, y también para el emprendedor que atiende solo.',
  modules: [
    { title: 'Toma de pedidos', text: 'Pedidos por mesa o venta directa, con adiciones y envío a cocina.' },
    { title: 'Mesas', text: 'Mira qué mesas están libres u ocupadas y agrega productos a una cuenta abierta.' },
    { title: 'Caja y pagos', text: 'Cobro de cuentas y registro de comprobantes de pago (bauchers).' },
    { title: 'Apertura y cierre', text: 'Abre el día, ciérralo con su resumen y revisa los registros de cada jornada.' },
    { title: 'Inventario de insumos', text: 'Stock, ajustes y movimientos; marca productos como agotados al instante.' },
    { title: 'Administración', text: 'Gestiona productos, categorías y extras, con accesos según el rol de cada usuario.' },
  ],
  micro: {
    title: 'Modo micro-emprendimiento',
    text: '¿Atiendes solo tu puesto? Vende directo, sin mesas ni meseros, y apaga o enciende la cocina según lo necesites.',
  },
}

export const purpose = {
  number: 4,
  label: 'PARA QUÉ EXISTIMOS',
  title: 'Para que el pequeño negocio tenga la misma tecnología que el grande.',
  mission: {
    title: 'Misión',
    text: 'Ayudar a negocios de comida y emprendedores colombianos a ordenar su operación diaria con software sencillo, confiable y acompañado de soporte cercano.',
  },
  vision: {
    title: 'Visión',
    text: 'Ser la opción de confianza en software para restaurantes y comercios del Valle del Cauca y, desde ahí, del resto de Colombia.',
  },
  values: [
    { title: 'Simplicidad', text: 'Pantallas claras que cualquier persona del equipo aprende rápido.' },
    { title: 'Cercanía', text: 'Hablas directamente con quienes construyen el software.' },
    { title: 'Mejora continua', text: 'El sistema crece con tu negocio: actualizaciones y nuevas funciones.' },
    { title: 'Responsabilidad', text: 'Cuidamos tu información y la de tus clientes.' },
  ],
}

export const plans = {
  number: 5,
  label: 'PLANES ENTYPOS',
  title: 'Una suscripción mensual, sin pagar todo de una vez.',
  text: 'Adaptamos EntyPOS a tu negocio y lo mantenemos funcionando: servidor, actualizaciones y soporte incluidos en tu plan.',
  items: [
    { name: 'Básico', price: '[PRECIO]', text: 'Historial y descarga de los registros del día.', featured: false },
    { name: 'Plata', price: '[PRECIO]', text: 'Historial y descarga de la semana completa.', featured: true },
    { name: 'Oro', price: '[PRECIO]', text: 'Historial y descarga del mes completo.', featured: false },
  ],
}

// ---------- Redes y contacto ----------
// Cambia estos datos por los reales
export const social = {
  whatsappNumber: '57[TU NÚMERO]', // 57 + número, sin espacios ni +. Ej: '573001234567'
  whatsappMessage: 'Hola EntySoftware, quiero información sobre sus servicios.',
  instagramUser: '[TU_USUARIO]', // sin @. Ej: 'entysoftware'
}

export const links = {
  whatsapp: `https://wa.me/${social.whatsappNumber}?text=${encodeURIComponent(social.whatsappMessage)}`,
  instagram: `https://instagram.com/${social.instagramUser}`,
}

export const contact = {
  title: '¿Tienes un negocio y una idea? Hablemos.',
  text: 'Te mostramos EntyPOS funcionando o escuchamos lo que necesitas construir.',
}

export const footer = {
  place: 'Valle del Cauca, Colombia'
}