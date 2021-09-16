use wasm_bindgen::prelude::*;
use nalgebra::Matrix3;

#[wasm_bindgen]
pub fn hello() -> String {
    return String::from("Hello, world!");
}

#[wasm_bindgen]
pub fn get_matrix() -> String {
    let a = Matrix3::new(8., 1., 6.,
                         3., 5., 7.,
                         4., 9., 2.);
    let b = a.try_inverse().unwrap();
    return b.to_string();
}
