import {Test} from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import * as pactum from 'pactum'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { PrismaService } from '../src/prisma/prisma.service'
import { LoginAuthDto, SignupAuthDto } from 'src/auth/dto'
import { AddProductDto } from 'src/product/dto'
import { AddToCartDto } from 'src/cart/dto'

describe('App e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  beforeAll(async ()=>{
    const moduleRef = await Test.createTestingModule({
      imports:[AppModule],
    }).compile()

    app=moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({
      whitelist:true
    }))
    await app.init()
    await app.listen(3000)
    
    prisma = app.get(PrismaService)
    await prisma.cleanDb()
    pactum.request.setBaseUrl('http://localhost:3000')
  })
  afterAll(async ()=>{
    await app.close()
  })
  describe('Auth', () => { 
    describe('Signup', () => {
      it('should signup',()=>{
        const dto: SignupAuthDto={
          email:"test@gmail.com",
          address:"giza",
          name:"test",
          password: "123"
        }
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201)
      })
    })
    describe('Login', () => {
      it('should login',()=>{
        const dto: LoginAuthDto={
          email:"test@gmail.com",
          password: "123"
        }
        return pactum.spec().post('/auth/login').withBody(dto).expectStatus(200).stores('userAt','access_token')
      })
    })

  })
  
  describe('User', () => { 
    describe('GetUser', () => { 
      it('should get current user',()=>{
        return pactum.spec().get('/users/me').withHeaders({
          Authorization: 'Bearer $S{userAt}'
        }).expectStatus(200)
      })
    })
   })

   let productIds: number[] = [];

  describe('Products', () => { 
    const products: AddProductDto[] = [
        { name: "test product 1", description: "test 1", price: 2, stock: 300 },
        { name: "test product 2", description: "test 2", price: 3, stock: 200 },
        { name: "test product 3", description: "test 3", price: 4, stock: 100 },
      ];
      for (const dto of products) {
  describe('AddProducts', () => {
    it('should add products', async () => {
        const response= await pactum.spec()
          .post('/products/add')
          .withBody(dto)
          .expectStatus(201) 
          .returns('productId')

          productIds.push(response);
    });
  });
}
});

  describe('Carts', () => { 
    for (const id of productIds) {
    describe('AddToCart', () => {
      it('should add to cart',()=>{
        
        const dto: AddToCartDto={
          productId:id,
          quantity:2
        }
        return pactum.spec().post('/cart/add').withHeaders({
          Authorization: 'Bearer $S{userAt}'
        }).withBody(dto).expectStatus(201)
      
      })
    })
  }
    describe('ViewCart', () => {
      it('should get user cart',()=>{
        return pactum.spec().get('/cart/view').withHeaders({
          Authorization: 'Bearer $S{userAt}'
        }).expectStatus(200)
      
      })
    })
    
   })
 })