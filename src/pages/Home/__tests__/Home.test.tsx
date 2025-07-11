import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";

import mockServer from "@/tests/mockServer";
import { TestWrapper } from "@/tests/TestWrapper";
import { USERS_MOCK } from "../__mocks__/users.mock";
import Home from "..";
import { REPOSITORIES_MOCK } from "../__mocks__/repositories";

describe("Home Page", () => {
  it("rendered successfully", async () => {
    mockServer.use(
      http.get(
        "https://api.github.com/search/users?q=dan&per_page=5&page=1",
        async () => {
          return HttpResponse.json(USERS_MOCK);
        }
      ),
      http.get("https://api.github.com/users/dan/repos", async () => {
        return HttpResponse.json(REPOSITORIES_MOCK);
      })
    );
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    expect(
      screen.getByText("GitHub User & Repository Search")
    ).toBeInTheDocument();

    const searchInput = screen.getByTestId("search-input");
    await userEvent.type(searchInput, "dan");
    const userList = await screen.findAllByTestId("user");
    expect(userList).toHaveLength(5);

    const [firstUser] = userList;
    await userEvent.click(firstUser);
    expect(await screen.findAllByTestId("repository")).toHaveLength(
      REPOSITORIES_MOCK.length
    );
  });

  it("rendered empty repository", async () => {
    const [user] = USERS_MOCK.items;
    const username = user.login;
    mockServer.use(
      http.get(
        "https://api.github.com/search/users?q=dan&per_page=5&page=1",
        async () => {
          return HttpResponse.json(USERS_MOCK);
        }
      ),
      http.get(`https://api.github.com/users/${username}/repos`, async () => {
        return HttpResponse.json([]);
      })
    );
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    expect(
      screen.getByText("GitHub User & Repository Search")
    ).toBeInTheDocument();

    const searchInput = screen.getByTestId("search-input");
    await userEvent.type(searchInput, "dan");
    const userList = await screen.findAllByTestId("user");
    expect(userList).toHaveLength(5);

    const [firstUser] = userList;
    await userEvent.click(firstUser);
    expect(await screen.findByText("No repositories found for this user."));
  });

  it("rendered empty user > clear input", async () => {
    mockServer.use(
      http.get(
        "https://api.github.com/search/users?q=john&per_page=5&page=1",
        async () => {
          return HttpResponse.json({
            total_count: 0,
            items: [],
          });
        }
      )
    );
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    expect(
      screen.getByText("GitHub User & Repository Search")
    ).toBeInTheDocument();

    const searchInput = screen.getByTestId("search-input");
    await userEvent.type(searchInput, "john");
    expect(await screen.findByText("No users found"));

    await userEvent.click(screen.getByTestId("clear-input"));
    expect(
      screen.getByPlaceholderText("Search for a GitHub user")
    ).toBeInTheDocument();
  });
});
