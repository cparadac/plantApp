/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlantListComponent } from './plant-list.component';
import { HttpClientModule } from '@angular/common/http';
import { faker } from '@faker-js/faker';
import { Plant } from '../plant';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;
  let debug: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ PlantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantListComponent);
    component = fixture.componentInstance;

    const plantTypes = ['Interior', 'Exterior']
 
    for(let i = 0; i < 10; i++) {
      const plant = new Plant(
        faker.datatype.number(),
        faker.lorem.word(),
        faker.lorem.word(),
        plantTypes[getRandomInt(0,plantTypes.length)],
        faker.datatype.number(),
        faker.lorem.word(),
        faker.lorem.word(),
      );
      component.plants.push(plant);
    }
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 1 <h1.card-title> element', () => {
    expect(debug.queryAll(By.css('h1'))).toHaveSize(1);
    expect(debug.query(By.css('h1.card-title')).nativeElement.textContent).toEqual('Vivero el Otoño');
  });

  it('should have <img> element', () => {
    expect(debug.queryAll(By.css('img'))).toHaveSize(1);
    expect(debug.query(By.css('img')).attributes['src']).toEqual('../../../assets/image 2.png');
  });

  it('should have <table> element', () => {
    expect(debug.queryAll(By.css('table'))).toHaveSize(1);
  });
  
  it('should have <tr> elements', () => {
    const father = debug.query(By.css('tbody'));
    expect(father.queryAll(By.css('tr'))).toHaveSize(component.plants.length);
  });

  it('should see in <tr> elements the plants information', () => {
    const father = debug.query(By.css('tbody'));
    expect(father.queryAll(By.css('tr'))).toHaveSize(component.plants.length);
    
    father.queryAll(By.css('tr')).forEach((element, index) => {
      expect(element.queryAll(By.css('th'))).toHaveSize(1)
      
      expect(element.query(By.css('th')).nativeElement.textContent).toEqual(component.plants[index].id.toString())

      expect(element.queryAll(By.css('td'))).toHaveSize(3)
      const elements = element.queryAll(By.css('td'));

      expect(elements[0].nativeElement.textContent).toEqual(component.plants[index].nombre_comun);
      expect(elements[1].nativeElement.textContent).toEqual(component.plants[index].tipo);
      expect(elements[2].nativeElement.textContent).toEqual(component.plants[index].clima);
    });
  });

  it('should have 2 <p> elements', () => {
    expect(debug.queryAll(By.css('p'))).toHaveSize(2)
  });

  it('should see in 2 <p> elements the quantity of plants type', () => {
    expect(debug.queryAll(By.css('p'))).toHaveSize(2)
    
    const elements = debug.queryAll(By.css('p'));

    expect(elements[0].nativeElement.textContent).toEqual(`Total plantas de Interior: ${component.getQuantityplantsByType('Interior')}`);
    expect(elements[1].nativeElement.textContent).toEqual(`Total plantas de Exterior: ${component.getQuantityplantsByType('Exterior')}`);
  });

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };    
});
