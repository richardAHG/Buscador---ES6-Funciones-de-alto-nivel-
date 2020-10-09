class SearchAutos {
  //variables
  constructor() {
    //parametro de años
    this.currentYear = new Date().getFullYear(); //año actual
    this.yearMin = this.currentYear - 10;
    //select
    this.year = document.querySelector("#year");
    //formulario
    this.form = document.querySelector("#buscador");
    //datos a filtrar
    this.resultado = document.querySelector("#resultado");
    this.filtrar = {
      marca: "",
      year: "",
      minimo: "",
      maximo: "",
      puertas: "",
      color: "",
      transmision: "",
    };
  }

  //funciones internas
  _loadSelectYear() {
    for (let i = this.currentYear; i > this.yearMin; i--) {
      let p = document.createElement("option");
      p.value = i;
      p.textContent = i.toString();
      this.year.appendChild(p);
    }
  }

  _setValueFilter() {
    this.form.onchange = (e) => {
      const idselect = e.target.id;
      const value = e.target.value;

      for (const key in this.filtrar) {
        if (key == idselect) {
          this.filtrar[key] = value;
          break;
        }
      }
      this._showFilterCardList();
    };
  }

  _showFilterCardList() {
    const resultado = autos.filter((auto) => this._filtrarAuto(auto));
    this._showResult(resultado);
  }

  _filtrarAuto(auto) {
    const {
      marca,
      year,
      minimo,
      maximo,
      puertas,
      color,
      transmision,
    } = this.filtrar;

    return (
      (marca === "" || auto.marca === marca) &&
      (year === "" || +auto.year === +year) &&
      (minimo === "" || +auto.precio >= +minimo) &&
      (maximo === "" || +auto.precio <= +maximo) &&
      (puertas === "" || +auto.puertas === +puertas) &&
      (transmision === "" || auto.transmision === transmision) &&
      (color === "" || auto.color === color)
    );
  }

  _showResult(autos) {
    this._cleanHTML();
    if (autos.length == 0) {
      return this._DontResult();
    }

    autos.forEach((auto) => {
      const { marca, modelo, year, precio, puertas, color, transmision } = auto;
      let p = document.createElement("p");
      p.textContent = `Marca : ${marca} /
                         Modelo :${modelo} /
                         Año : ${year} /
                         Precio : ${precio} /
                         Puertas : ${puertas} /
                         Color : ${color} /
                         Transmision : ${transmision}`;
      this.resultado.appendChild(p);
    });
  }

  _cleanHTML() {
    while (this.resultado.firstChild) {
      this.resultado.removeChild(this.resultado.firstChild);
    }
  }

  _DontResult() {
    const noResultado = document.createElement("div");
    noResultado.classList.add("alerta", "error");
    noResultado.textContent =
      "No Hay Resultados, Intenta con otros términos de búsqueda";

    this.resultado.appendChild(noResultado);
  }

  //inicializar
  init() {
    this._loadSelectYear();
    this._setValueFilter();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let obj = new SearchAutos();
  obj.init();
});
