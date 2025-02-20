package com.reware.rejobs.seeders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.reware.rejobs.models.Categoria;
import com.reware.rejobs.repositories.CategoriaRepository;

import java.util.Arrays;

@Component
public class CategoriaSeeder implements CommandLineRunner {

    @Autowired
    private CategoriaRepository categRepository;

    @Override
    public void run(String... args) throws Exception {
        CategoriaData();
    }

    private void CategoriaData() {
        if (categRepository.count() == 0) {
            Categoria categ1 = new Categoria("Construccion");
            Categoria categ2 = new Categoria("Ventas y Negocio");
            Categoria categ3 = new Categoria("IT y Software");
            Categoria categ4 = new Categoria("Ingeniería");
            Categoria categ5 = new Categoria("Atencion al Cliente");
            Categoria categ6 = new Categoria("Comercial");
            Categoria categ7 = new Categoria("Salud");
            Categoria categ8 = new Categoria("Recursos Humanos");
            Categoria categ9 = new Categoria("Educacion");
            Categoria categ10 = new Categoria("Transporte y Logistica");

            categRepository.saveAll(Arrays.asList(
                categ1, categ2, categ3, categ4, categ5, categ6, categ7, categ8, categ9, categ10
            ));
        }
        System.out.println("Categorías en BD: " + categRepository.count());
    }
}
