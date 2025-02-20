package com.reware.rejobs.seeders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.reware.rejobs.models.Categoria;
import com.reware.rejobs.models.SubCategoria;
import com.reware.rejobs.repositories.CategoriaRepository;
import com.reware.rejobs.repositories.SubCategoriaRepository;

import java.util.Arrays;
import java.util.Optional;

@Component
public class SubCategoriaSeeder implements CommandLineRunner {

    @Autowired
    private SubCategoriaRepository subcRepository;

    @Autowired
    private CategoriaRepository categRepository;

    @Override
    public void run(String... args) throws Exception {
        SubCategoriaData();
    }

    private void SubCategoriaData() {
    if (subcRepository.count() == 0) {
        // Recuperamos las categorías de la base de datos
        Categoria categoriaConstruccion = categRepository.findByNombreLike("Construccion")
            .stream()
            .findFirst()
            .orElse(null);

        Categoria categoriaVentas = categRepository.findByNombreLike("Ventas y Negocio")
            .stream()
            .findFirst()
            .orElse(null);

        Categoria categoriaIT = categRepository.findByNombreLike("IT y Software")
            .stream()
            .findFirst()
            .orElse(null);

        Categoria categoriaIngenieria = categRepository.findByNombreLike("Ingeniería")
            .stream()
            .findFirst()
            .orElse(null);

        Categoria categoriaAtencion = categRepository.findByNombreLike("Atencion al Cliente")
            .stream()
            .findFirst()
            .orElse(null);

        Categoria categoriaComercial = categRepository.findByNombreLike("Comercial")
            .stream()
            .findFirst()
            .orElse(null);

        Categoria categoriaSalud = categRepository.findByNombreLike("Salud")
            .stream()
            .findFirst()
            .orElse(null);

        Categoria categoriaRRHH = categRepository.findByNombreLike("Recursos Humanos")
            .stream()
            .findFirst()
            .orElse(null);

        Categoria categoriaEducacion = categRepository.findByNombreLike("Educacion")
            .stream()
            .findFirst()
            .orElse(null);

        Categoria categoriaTransporte = categRepository.findByNombreLike("Transporte y Logistica")
            .stream()
            .findFirst()
            .orElse(null);

        // Verificamos que todas las categorías existen antes de continuar
        if (categoriaConstruccion != null && categoriaVentas != null && categoriaIT != null &&
            categoriaIngenieria != null && categoriaAtencion != null && categoriaComercial != null &&
            categoriaSalud != null && categoriaRRHH != null && categoriaEducacion != null &&
            categoriaTransporte != null) {

            SubCategoria subc1 = new SubCategoria("Albañilería", categoriaConstruccion);
            SubCategoria subc2 = new SubCategoria("Electricidad", categoriaConstruccion);

            SubCategoria subc3 = new SubCategoria("Ventas Minoristas", categoriaVentas);
            SubCategoria subc4 = new SubCategoria("Ventas Corporativas", categoriaVentas);

            SubCategoria subc5 = new SubCategoria("Desarrollo Web", categoriaIT);
            SubCategoria subc6 = new SubCategoria("Ciberseguridad", categoriaIT);

            SubCategoria subc7 = new SubCategoria("Ingeniería Civil", categoriaIngenieria);
            SubCategoria subc8 = new SubCategoria("Ingeniería Mecánica", categoriaIngenieria);

            SubCategoria subc9 = new SubCategoria("Call Center", categoriaAtencion);
            SubCategoria subc10 = new SubCategoria("Soporte Técnico", categoriaAtencion);

            SubCategoria subc11 = new SubCategoria("Marketing Digital", categoriaComercial);
            SubCategoria subc12 = new SubCategoria("Gestión de Ventas", categoriaComercial);

            SubCategoria subc13 = new SubCategoria("Enfermería", categoriaSalud);
            SubCategoria subc14 = new SubCategoria("Fisioterapia", categoriaSalud);

            SubCategoria subc15 = new SubCategoria("Reclutamiento", categoriaRRHH);
            SubCategoria subc16 = new SubCategoria("Capacitación", categoriaRRHH);

            SubCategoria subc17 = new SubCategoria("Docencia", categoriaEducacion);
            SubCategoria subc18 = new SubCategoria("Formación Online", categoriaEducacion);

            SubCategoria subc19 = new SubCategoria("Logística de Transporte", categoriaTransporte);
            SubCategoria subc20 = new SubCategoria("Manejo de Carga", categoriaTransporte);

            // Guardamos en la base de datos
            subcRepository.saveAll(Arrays.asList(
                subc1, subc2, subc3, subc4, subc5, subc6, subc7, subc8, subc9, subc10,
                subc11, subc12, subc13, subc14, subc15, subc16, subc17, subc18, subc19, subc20
            ));
        } else {
            System.out.println("Error: No se encontraron todas las categorías necesarias.");
        }
    }
    System.out.println("Subcategorías en BD: " + subcRepository.count());
}

}
