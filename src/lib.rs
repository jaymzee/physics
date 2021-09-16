use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn foo() -> String {
    return String::from("Hello, world!");
}
