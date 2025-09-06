"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const obtenerPokemon = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(`Nombre: ${response.data.name}`);
        console.log(`Peso: ${response.data.weight}`);
        console.log(`Altura: ${response.data.height}`);
        console.log(`Habilidades: ${response.data.abilities.map((habilidad) => habilidad.ability.name).join(", ")}`);
        console.log(`Tipos: ${response.data.types.map((tipo) => tipo.type.name).join(", ")}`);
        return response.data;
    }
    catch (error) {
        console.error("Error al obtener el Pokémon:", error);
    }
});
obtenerPokemon(1);
