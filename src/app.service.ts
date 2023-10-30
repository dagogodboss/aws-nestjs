import { BadRequestException, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import {
  LoginCredential,
  AuthUserResponse,
  AuthUser,
} from './employee/interface/IEmployee';
import { ConfigService } from '@nestjs/config';
import { AWSError } from 'aws-sdk';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

@Injectable()
export class AppService {
  // Token expiration times (in seconds)
  private accessTokenExpiration = 3600; // 1 hour
  private refreshTokenExpiration = 604800; // 7 days
  private tableName: string;

  constructor(
    protected readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.tableName = this.configService.get('EMPLOYEE_TABLE');
  }

  getHello(): string {
    return 'Hello World!';
  }

  async login(loginDto: LoginCredential): Promise<AuthUserResponse> {
    /**
     * find the user by email / username
     * compare the passwordHash from the user, and the password from the Credential
     * throw error if the user is not found and/or if the password doesn't match
     * Create a new JWT Object token with access token and refresh token
     * */

    // Find the user by email/username
    const authUser = await this.findUserByEmailOrUsername(loginDto.info);

    // Verify the user's password
    if (!authUser || !compareSync(loginDto.password, authUser.password)) {
      throw new BadRequestException(
        'Authentication failed, invalid credentials',
      );
    }

    // User is authenticated, generate JWT tokens
    const accessToken = this.generateAccessToken(authUser);
    const refreshToken = this.generateRefreshToken();

    // Store the refreshToken securely (e.g., in a database)
    // and associate it with the user for token refresh functionality.

    return { accessToken, refreshToken, authUser };
  }

  private async findUserByEmailOrUsername(
    info: string,
  ): Promise<AuthUser | null> {
    // Implement your logic to find the user in DynamoDB
    // Return the user if found, or null if not found
    const params = {
      TableName: this.tableName,
      FilterExpression: 'email = :email OR username = :username',
      ExpressionAttributeValues: {
        ':email': info,
        ':username': info,
      },
    };

    try {
      const data = await dynamoDB.scan(params).promise();
      const user = data.Items?.[0] as unknown as AuthUser;
      return user || null;
    } catch (error) {
      throw error;
    }
  }

  private generateAccessToken(user: AuthUser): string {
    // Create the payload for the access token
    const payload = { sub: user.id, email: user.email, role: user.role };

    // Sign and return the access token
    return this.jwtService.sign(payload, {
      expiresIn: this.accessTokenExpiration,
    });
  }

  private generateRefreshToken(): string {
    // Implement your refresh token generation logic here
    // Example: Generate a random string with sufficient entropy
    const tokenLength = 32;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let refreshToken = '';

    for (let i = 0; i < tokenLength; i++) {
      refreshToken += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return refreshToken;
  }
}

// dynamoDB
//   .put({
//     TableName: this.configService.get<string>('EMPLOYEE_TABLE'),
//     Item: loginDto,
//   })
//   .promise();
