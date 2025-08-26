# Database Migration

## Local to AWS RDS MySQL Migration

If you need to migrate from local MySQL to AWS RDS MySQL, see the comprehensive guide:

📖 **[AWS RDS Migration Guide](./AWS_RDS_MIGRATION_GUIDE.md)**

This guide contains:
- Step-by-step code changes required
- Environment variable configuration
- Common issues and solutions
- Security best practices
- Testing and rollback procedures

## Quick Migration Summary

1. Update `database.py` with AWS RDS endpoint and credentials
2. Update `.env` file with RDS configuration
3. Ensure RDS security group allows your IP on port 3306
4. Use `admin` as username (not `root`) for AWS RDS
5. Create the database on RDS if it doesn't exist
6. Restart your application

For detailed instructions, refer to the full migration guide.
