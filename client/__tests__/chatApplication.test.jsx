import { ChatApplication } from "../components/ChatApplication";
import ReactDOM from "react-dom";
import React from "react";
import { Simulate } from "react-dom/test-utils";

describe("Chat application", () => {
  it("should show chats", () => {
    const chats = [
      { user: "test user", message: "message 1" },
      { user: "other user", message: "message 2" },
    ];

    const element = document.createElement("div");
    ReactDOM.render(<ChatApplication messages={chats} />, element);
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should submit new chat", () => {
    const element = document.createElement("div");
    const onNewMessage = jest.fn();
    ReactDOM.render(
      <ChatApplication messages={[]} onNewMessage={onNewMessage} />,
      element
    );
    Simulate.change(element.querySelector("footer input"), {
      target: { value: "new message" },
    });
    Simulate.submit(element.querySelector("footer form"));
    expect(onNewMessage).toBeCalledWith("new message");
  });
});
