import { mutations, actions } from "@/store";
import flushPromises from "flush-promises";
jest.mock("@/api", () => ({
  all: () =>
    Promise.resolve({
      data: {
        amIaFruit: {
          isFruit: true,
          name: "apple",
          image:
            "https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/apple.jpg",
          price: "148.00",
          color: "#176800",
          description: "An apple is an edible fruit produced by an apple tree.",
          taste: "Ergonomic",
          expires: "2020-06-17T06:29:09.774Z",
          id: 1,
        },
      },
    }),
  show: (id) => Promise.resolve({ id }),
  store: (data) => Promise.resolve({ data }),
  delete: jest.fn().mockImplementation((id) => Promise.resolve(id)),
}));
import api from "@/api";

describe("Vuex Store", () => {
  it("should commit new fruit", async () => {
    const fruit = { id: 1, name: "Post" };
    const state = {
      fruits: [],
    };

    mutations.ADD_FRUIT(state, fruit);
    expect(state).toEqual({
      fruits: [fruit],
    });
  });

  it("should remove a fruit by id if exists", async () => {
    const fruit = { id: 1, name: "Post" };
    const state = {
      fruits: [fruit],
    };
    mutations.DELETE_FRUIT(state, fruit.id);
    expect(state.fruits.length).toEqual(0);
  });

  it("shouldn't remove a fruit by id is not found", async () => {
    const fruit = { id: 1, name: "Post" };
    const state = {
      fruits: [fruit],
    };
    mutations.DELETE_FRUIT(state, 5);
    expect(state.fruits.length).toEqual(1);
  });

  it("addFruit action calls ADD_FRUIT mutation", async () => {
    const context = {
      commit: jest.fn(),
    };
    const fruit = {
      name: 3,
      description:
        "Quo voluptas sint voluptas optio veritatis eaque aspernatur et.",
    };
    actions.addFruit(context, fruit);
    await flushPromises();
    expect(context.commit).toHaveBeenCalledWith("ADD_FRUIT", fruit);
  });

  it("deleteFruit action calls DELETE_FRUIT mutation", async () => {
    const context = {
      commit: jest.fn(),
    };
    const fruit = {
      id: 3,
    };

    actions.deleteFruit(context, fruit);
    await flushPromises();
    expect(api.delete).toHaveBeenCalledWith(fruit.id);
    expect(context.commit).toHaveBeenCalledWith("DELETE_FRUIT", fruit.id);
  });
});
