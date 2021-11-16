/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {allPass, anyPass, compose, converge, equals, filter, length, lte, not, prop, propEq, values} from 'ramda';

const isGreen = equals('green');
const isBlue = equals('blue');
const isRed = equals('red');
const isWhite = equals('white');
const isOrange = equals('orange');

const filterGreen = filter(isGreen);
const filterRed = filter(isRed);
const filterBlue = filter(isBlue);
const filterOrange = filter(isOrange);

const getGreenCount = compose(length, filterGreen, values);
const getRedCount = compose(length, filterRed, values);
const getBlueCount = compose(length, filterBlue, values);
const getOrangeCount = compose(length, filterOrange, values);

const getTriangle = prop('triangle');
const getStar = prop('star');
const getSquare = prop('square');

const isWhiteSquare = propEq('square', 'white');
const isWhiteCircle = propEq('circle', 'white');
const isWhiteTriangle = propEq('triangle', 'white');

const isBlueCircle = propEq('circle', 'blue');
const isRedStar = propEq('star', 'red');
const isGreenTriangle = propEq('triangle', 'green');
const isGreenSquare = propEq('square', 'green');
const isOrangeSquare = propEq('square', 'orange');

const equalsTriangleSquare = converge(equals, [getTriangle, getSquare]);
const notWhiteTriangleSquare = converge(equals, [isWhiteSquare, isWhiteTriangle]);
const isOneRed = compose(equals(1), getRedCount);
const isGreenEqualsTwo = compose(equals(2), getGreenCount);


// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([isGreenSquare, isRedStar, isWhiteCircle, isWhiteTriangle]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(lte(2), getGreenCount);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = converge(equals, [getBlueCount, getRedCount]);

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = allPass([isBlueCircle, isRedStar, isOrangeSquare]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([
    compose(lte(3), getRedCount),
    compose(lte(3), getGreenCount),
    compose(lte(3), getBlueCount),
    compose(lte(3), getOrangeCount)
]);

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([isOneRed, isGreenTriangle, isGreenEqualsTwo]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(equals(4), getOrangeCount);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = compose(not, anyPass([isRed, isWhite]), getStar);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(equals(4), getGreenCount);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = allPass([equalsTriangleSquare, notWhiteTriangleSquare]);
