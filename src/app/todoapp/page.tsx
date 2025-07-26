import { TodoList } from '@/features/todoapp/components/TodoList';

const TodoApp = () => {
	return <TodoList />;
};

export default TodoApp;

// 🧩 Ejercicio Integrador Sugerido
// Mini TodoApp con useReducer, useMemo, useCallback y React.memo
// Estado de tareas con useReducer.
// Filtrado de tareas completadas con useMemo.
// Funciones de agregar/eliminar tarea con useCallback.
// Componente de tarea memoizado.

// Tengo la duda de si al escribir en el input es normal que el padre se re renderice o solamente debe re renderizarse el input en si

// me tienes que enseñar a crear randoms entre un rango incluyendo o no los extremos, o hasta < que o <= que y > y >= que tambien a hacer randoms entre una lista controlada por ejemplo entre un array que elija random un item etc (supongo que seria con el random entre 0 y el length + 1 entero)

// tambien empezar a usar ids de verdad, ya sea con uuid o alguna otra libreria
//  tus ejerccicios fueron muy vagos, osea estaban bien pero tu enuncionado fue bastante malo, muy corto, o explicaste nada, osea yo me la complique por que el tuyo era muy ambiguo, no hagas eso, recuerda que debo dedicar mi tiempo a aprender lo nuevo, no a diseñar o pensar si una todu tiene fecha, tag, prioridades, etc. Dedique mucho al diseño en este caso y a las todos en si que a useReducer, Memo, useMemo, useCallback que era el objetivo..

// intenta tambien que los microejercicios o ejercicios que me des para practicar los temas en si tengan sentido, por que aqui el reducer lo use pero no se si es correcto y como te dije era tu trabajo darme posibles soluciones a dudas que tenga al final de tu respuesta que solo leere si realmente dudo, lo mismo con useMemo que ni idea por que ni que hace, osea si memoriza calculos pesados, pero ejemplo real? que dependencias lleva? como se si hace o no efecto? memo lo entendi parcialmente y callback entendi que solo se usa cuand ose le pasan funciones a memo como parametro y ya, esta todo un poco confuso y en el aire, lo puede usar todo, pero siento que quizas tu forma de explicarme y en general tu mensaje que debia ser muy completo no lo fue, si por algun motivo no te da para generar tu respuesta completa en un solo mensaje prefiero que me digas y respondes 2 o 3 veces para formar tu respuesta en los proximos ejercicios y cosas que vayamos haciendo del roadmap, recuerda que no se si en el roadmap o en un a rchivo aparte, pero ve dejandote notas para ti para que no pierdas el contedxtos y sepas como ir respondiendo, sepas donde estoy, cuales fueron mis dudas, que entendi a la perfeccion, que no, que deberias volver a darme en otro ejercicio, que tengo que mejorar, que soy bnuena, etc etc. el roadmap es para ambos, el de contexto seria mas para ti.

// intentemos que los temas nuevos que me vayas dando si son compatibles o sinergicos me des varios juntos, si son muy complejos, mejor dea uno, o si son muy diferentes o no hay sinergia como tal, mejor de a uno, es evalualo tu en cada parte que me des.

// ya han pasado mas dias, he visto que con el reducer se puede controlar todo el form, stados globales incluso, estados de carga, errores, ui, muchas cosas, me gustaria a futuro quizas antes de entrar ya con zustand y query hacer algo con un useReducer bien completo, ya que luego no lo usare tanto cuando este con librerias.
