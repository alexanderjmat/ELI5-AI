import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Home from "./Home";
import Context from "../Context";

afterEach(cleanup);

test("render Home component correctly", () => {
const { getByText } = render(
<Context.Provider value={{ home: { currentNewsletter: { date_published: "2022-01-01", overviews: [{ overview: "test overview" }], entries: [{ id: 1, title: "test title", article: "test article", url: "https://test.com" }] } } }}>
<Home />
</Context.Provider>
);
const header = getByText("2022-01-01");
const overview = getByText("test overview");
const entryTitle = getByText("test title");
const entryArticle = getByText("test article");

expect(header).toBeInTheDocument();
expect(overview).toBeInTheDocument();
expect(entryTitle).toBeInTheDocument();
expect(entryArticle).toBeInTheDocument();
});

test("render Home component with no current newsletter", () => {
const { queryByText } = render(
<Context.Provider value={{ home: { currentNewsletter: null } }}>
<Home />
</Context.Provider>
);
const header = queryByText("Latest Edition");

expect(header).toBeNull();
});

test("render Home component with alternating styles for entries", () => {
const { getAllByTestId } = render(
<Context.Provider value={{ home: { currentNewsletter: { date_published: "2022-01-01", overviews: [{ overview: "test overview" }], entries: [{ id: 1, title: "test title 1", article: "test article 1", url: "https://test.com" }, { id: 2, title: "test title 2", article: "test article 2", url: "https://test.com" }] } } }}>
<Home />
</Context.Provider>
);
const entry1 = getAllByTestId("entry-1")[0];
const entry2 = getAllByTestId("entry-2")[0];

expect(entry1).toHaveStyle("border: 2px solid red;");
expect(entry2).toHaveStyle("border: 2px solid blue;");
});