import { } from "jest"
import { } from "ts-jest"
import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase"

let createUserUseCase: CreateUserUseCase;
let usersInMemory: InMemoryUsersRepository;

describe("Create a User", () => {

  beforeEach(() => {
    usersInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersInMemory);
  })

  it("should be able to create a new user", async () => {
    const user = {
      name: "lucas marcell",
      email: "lmarcell18@gmail.com",
      password: "senha",
    }

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const userCreated = await usersInMemory.findByEmail(user.email)

    expect(userCreated).toHaveProperty("id")
  });

  it("should not be able to create a new user with email exists", async () => {
    expect(async () => {
      const user = {
        name: "lucas marcell",
        email: "lmarcell18@gmail.com",
        password: "senha",
      }

      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
      });

      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError)
  });
});
