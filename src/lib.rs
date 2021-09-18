mod utils;

use wasm_bindgen::prelude::*;
use nalgebra::{Matrix3, Vector3};

#[wasm_bindgen]
pub fn init() {
    utils::set_panic_hook();
}

#[wasm_bindgen]
pub fn invert_matrix() -> String {
    let a = Matrix3::new(8., 1., 6.,
                         3., 5., 7.,
                         4., 9., 2.);
    let b = a.try_inverse().unwrap();
    return b.to_string();
}

#[wasm_bindgen]
pub fn solve3(a: &[f64], b: &[f64]) -> String {
    if a.len() != 9 {
        panic!("solve3: a len must be 9");
    }
    if b.len() != 3 {
        panic!("solve3: b len must be 3");
    }
    let mut rslt = Vec::<String>::new();
    let a = Matrix3::new(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
    let b = Vector3::new(b[0], b[1], b[2]);
    rslt.push(format!("A =\n{:.4}", a));
    rslt.push(format!("b =\n{:.4}", b));

    let a_lu = a.lu();
    rslt.push(format!("L = {}", Matrix3::from(a_lu.l())));
    rslt.push(format!("U = {}", Matrix3::from(a_lu.u())));
    rslt.push(format!("P = {:?}", a_lu.p()));

    let x = a_lu.solve(&b).unwrap();
    rslt.push(format!("solve:"));
    rslt.push(format!("x =\n{:.4}", x));
    rslt.push(format!("A x = {:.4}", a * x));

    rslt.join("\n")
}

#[wasm_bindgen]
pub fn modify_vec3(v: Vec<f64>) -> Vec<f64> {
    vec![v[0]+1.0,v[1],v[2]]
}
