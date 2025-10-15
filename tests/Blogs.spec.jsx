import React from "react";
import { render, screen, fireEvent} from "@testing-library/react";
import Blogs from "../src/pages/Blogs";
import { MemoryRouter } from "react-router-dom";
import { expect, vi } from "vitest";

//Mock es una version falsa del componente para no tener que renderizarlo realmente
vi.mock("../src/components/Header/HeaderComponents", () => ({
  __esModule: true, //Permite que el export default funcione como el original
  default: () => <div data-testid="header-mock" />, //Reemplaza el export original y crea un componente react falso que solo renderiza un div vacio
}));

vi.mock("../src/components/Footer/FooterComponent", () => ({
  __esModule: true,
  default: () => <div data-testid="footer-mock" />,
}));

vi.mock("../src/components/ArticuloBlogs/ArticuloBlogsComponent", () => ({
  __esModule: true,
  default: () => <div data-testid="articulo-mock" />,
}));

describe ("Componenete Blogs", () => {
    it("Renderiza titulo correctamente", () => {
        render(<MemoryRouter><Blogs /></MemoryRouter>);
        expect(screen.getByText('Noticias Importantes')).toBeInTheDocument();
    });
    it("Renderiza header correctamente", () => {
        render(<MemoryRouter><Blogs /></MemoryRouter>);
        expect(screen.getByTestId('header-mock')).toBeInTheDocument();
    });
    it("Renderiza footer correctamente", () => {
        render(<MemoryRouter><Blogs /></MemoryRouter>);
        expect(screen.getByTestId('footer-mock')).toBeInTheDocument();
    });
    it("Renderiza un articulo correctamente", () => {
        render(<MemoryRouter><Blogs /></MemoryRouter>);
        expect(screen.getAllByTestId('articulo-mock')[0]).toBeInTheDocument();
    });
});
